
const { UserConnection } = require('../../config/database');

module.exports = {

    GetStoresCollection: async (id, callback) => {

        try {
            await UserConnection.query('CALL SuggestStoresCollection(?)', [id],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) {

        }
    },

    GetStoresBasedUserPosition: async (id, callback) => {

        try {
            await UserConnection.query('CALL SuggestStoresToUser (?)', [id],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) {

        }

    },

    GetLikedStoresToUser: async (id, callback) => {
        try {
            await UserConnection.query('CALL GetLikedSellersToUser (?)', [id],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) {

        }

    },

    UserDisLikeStore: async (data, callback) => {

        try {
            await UserConnection.query('CALL UserdislikeSeller(?,?)',
                [
                    data.UserID,
                    data.SellerID
                ],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) {

        }
    },


    UserLikeStore: async (data, callback) => {

        try {
            await UserConnection.query('CALL UserLikedStores (?,?)',
                [
                    data.UserID,
                    data.SellerID
                ],
                (error, result, fields) => {
                    if (error) return callback(error);
                    return callback(null, result);
                });
        } catch (error) {

        }
    }
};