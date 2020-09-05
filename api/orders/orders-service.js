const { UserConnection, Selleronnection, Connect } = require('../../config/database');

module.exports = {

  SetOrderDeliveryTime: async (data, callback) => {

    try {
      await Selleronnection.query('CALL SetOrderDeliveryTime(?,?)', [data.OrderID, data.OrderDeliveryTime],
        (error, result, fields) => {
          if (error) return callback(error);
          return callback(null, result);
        });

    } catch (e) { }

  },

  GetLast_15UserOrders: async (id, callback) => {

    try {

      await UserConnection.query('CALL Get_Last15_UserOrders(?)', [id],
        (error, result, fields) => {
          if (error) return callback(error);
          return callback(null, result);
        });
    } catch (e) { }
  },

  GetSellerOrderPerUser: async (id, callback) => {
    try {
      await Selleronnection.query('CALL GetSellerOrdersPerUser(?)', [id],
        (error, result, fields) => {
          if (error) return callback(error);
          return callback(null, result);
        });

    } catch (e) { }

  },

  GetSellerActiveOrders: async (id, callback) => {

    try {
      await Selleronnection.query('CALL GetSellerActiveOrders(?)', [id],
        (error, result, fields) => {
          if (error) return callback(error);
          return callback(null, result);
        });

    } catch (e) { }
  },

  CompleteOrder: async (data, callback) => {

    try {

      await Selleronnection.query('CALL CompleteOrder(?)', [data.OrderID],
        (error, result, fields) => {
          if (error) return callback(error);
          return callback(null, result);
        });

    } catch (e) { }

  },

  CreateOrder: async (data, callback) => {

    const OrderId = GenerateOrderId(data.UserID, data.SellerID);
    try {
      await Connect.beginTransaction(function (err) {
        if (err) { /* throw err; */ }
        Connect.query('CALL CreateOrder(?,?,?,?,?,?,?,?,?,?,?);',
          [
            OrderId,
            data.UserID,
            data.SellerID,
            data.RecipientName,
            data.RecipientPhone,
            data.RecipientAddress,
            data.RecipientLocLat,
            data.RecipientLocLong,
            data.OrderDeliveryTime,
            data.OrderCreationTime,
            0], function (error, results, fields) {
              if (error) {
                return Connect.rollback(/* function () {
                  throw error;
                } */);
              }

              //var log = 'Post ' + results.insertId + ' added';
              const products = data.products;
              for (i = 0; i < products.length; i++) {
                Connect.query('CALL AddProductsToOrder (?,?,?);',
                  [
                    OrderId,
                    products[i].ProductId,
                    products[i].Quantity
                  ], function (error, results, fields) {
                    if (error) {
                      return Connect.rollback(function () {
                        //throw error;
                      });
                    }
                    Connect.commit(function (err) {
                      if (err) {
                        return Connect.rollback(/* function () {
                          throw err;
                        } */);
                      }
                      //console.log('success!');

                    });
                  });
              }
            });
        return callback(null, { 'code': 1, 'result': 'order created' });
      });

    } catch (e) { }
  }
};


function GenerateOrderId(UserId, SellerId) {

  const RandomKey = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  const date = new Date();
  date.toLocaleDateString();
  const OrderId = UserId + '_' + SellerId + '_' + date.getDay() + '_' + date.getMonth() + '_' + date.getFullYear() + '_' + date.getHours() +
    '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getUTCMilliseconds() + '_' + RandomKey;
  return OrderId;
}