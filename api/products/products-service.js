const { UserConnection, Selleronnection } = require('../../config/database');

module.exports = {
    GetProductsByCategory: async (id, callback) => {

        try {
            await UserConnection.query('CALL GetUserProductsByCategory(?)', [id], (error, result, fields) => {
                if (error) return callback(error);
                return callback(null, result);
            });

        } catch (error) { }
    },

    GetProductsCollection: async (callback) => {

        try {
            await UserConnection.query('CALL GetUserProductsCollection;',
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) { }


    },

    GetSellerProducts2Users: async (id, callback) => {

        try {
            await UserConnection.query('CALL GetSellerProducts(?)',
                [id], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) { }
    },

    GetProductById: async (id, callback) => {

        try {

            await UserConnection.query('CALL GetProductById(?)',
                [id], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }
    },

    GetProductsBasedUserLocation: async (id, callback) => {

        try {

            await UserConnection.query('CALL GetProductsBasedUserLocation(?);',
                [id], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }
    },

    GetLikedSellerProductsToUser: async (id, callback) => {
        try {
            await UserConnection.query('CALL GetLikedSellerProducts(?)',
                [id], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }


    },

    GetSellerProducts: async (id, callback) => {

        try {
            await Selleronnection.query('CALL GetSellerProducts(?)',
                [id], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }
    },

    SetProduct: async (data, callback) => {
        try {

            await Selleronnection.query('CALL SetProductBySeller(?,?,?,?,?,?)',
                [
                    data.ProductID,
                    data.ProductName,
                    data.RagularPrice,
                    data.SellPrice,
                    data.CategoryID,
                    data.ProdDescription

                ],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });

        } catch (e) { }

    },

    DeleteProduct: async (data, callback) => {

        try {
            await Selleronnection.query('CALL DeleteProductBySeller (?)',
                [data.ProductID], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });

        } catch (e) { }
    },

    AddNewProduct: async (data, callback) => {
        try {

            await Selleronnection.query('CALL AddNewProduct (?,?,?,?,?,?,?,?)',
                [
                    data.ProductName,
                    data.RagularPrice,
                    data.SellPrice,
                    data.TimeOfAdd,
                    data.SellerID,
                    data.CategoryID,
                    data.Images,
                    data.ProdDescription

                ], (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (e) { }
    }

};