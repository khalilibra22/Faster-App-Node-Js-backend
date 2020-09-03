const { Selleronnection } = require('../../config/database');

module.exports = {

    ChangeCodeStatue: async (data, callback) => {

        try {
            await Selleronnection.query('CALL ChangeCodeStatue(?)',
                [
                    data.SellerCode,
                ], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }

    },

    CheckSellerCode: async (data, callback) => {
        try {
            await Selleronnection.query('CALL CheckSellerCode(?)',
                [
                    data.SellerCode,
                ], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }

    },

    SetSellerPosition: async (data, callback) => {
        try {
            await Selleronnection.query('CALL SetSellerPosition(?,?,?)',
                [
                    data.SellerID,
                    data.SellerLocationLat,
                    data.SellerLocatonLong], (error, result, fields) => {
                        if (error) return callback(error);
                        return callback(null, result);
                    });
        } catch (e) { }

    },

    GetSellerByEmail: async (email, callback) => {

        try {
            await Selleronnection.query('CALL GetSellerByEmail(?);',
                [email], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }
    },

    GetSellerPassword: async (id, callback) => {

        try {

            await Selleronnection.query('CALL GetSellerPassword(?)',
                [id],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        }
        catch (e) { }
    },

    SetSellerInfo: async (data, callback) => {
        //let SetSellerMsg = 'update fail';
        try {

            await Selleronnection.query('CALL SetSellerInformation(?,?,?,?,?,?,?)',
                [
                    data.SellerID,
                    data.SellerStorename,
                    data.SellerFullName,
                    data.SellerEmail,
                    data.SellerPhone,
                    data.SellerAddress,
                    data.DeliveryTime
                ],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }

    },

    CreateSeller: async (data, callback) => {

        try {
            await Selleronnection.query('CALL AddNewSeller(?,?,?,?,?,?,?,?,?,?,?,?,1,?)',
                [
                    data.SellerStorename,
                    data.SellerFullName,
                    data.SellerEmail,
                    data.SellerPhone,
                    data.SellerPass,
                    data.SellerAddress,
                    data.SellerImgURL,
                    5,
                    data.SellerLat,
                    data.Sellerlong,
                    data.DeliveryTime,
                    data.ContratExpiration,
                    data.notificationToken

                ],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });

        } catch (e) { }

    },

    GetSellerByID: async (id, callback) => {
        try {
            await Selleronnection.query('CALL GetSeller (?)',
                [id],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }
    }
};