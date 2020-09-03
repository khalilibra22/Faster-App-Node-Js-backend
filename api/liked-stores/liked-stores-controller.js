const Joi = require('@hapi/joi');
const { UserLikeStore, UserDisLikeStore, GetLikedStoresToUser, GetStoresBasedUserPosition, GetStoresCollection } = require('./liked-stores-service');
const { UserLikeStoreInputValidation } = require('../../validation/UserLikedStoresSchemas');

module.exports = {

    GetStoresCollectionControl: (req, res) => {
        try {
            const UserID = req.params.id;

            GetStoresCollection(UserID, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }
    },

    GetStoresBasedUserPositionControl: (req, res) => {

        try {
            const UserID = req.params.id;
            GetStoresBasedUserPosition(UserID, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }
    },

    GetLikedStoresToUserControl: (req, res) => {
        try {
            const UserID = req.params.id;
            GetLikedStoresToUser(UserID, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }

    },

    UserDislikeStoreControl: (req, res) => {

        try {
            const body = req.body;
            const { error, value } = UserLikeStoreInputValidation.validate(body);
            if (error) return res.status(400).send({ 'code': 0, 'result': error.details[0].message });
            UserDisLikeStore(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                return res.send({ 'code': 1, 'result': results });
            });
        } catch (error) {

        }
    },

    UserLikeStoreControl: (req, res) => {
        try {
            const body = req.body;
            const { error, value } = UserLikeStoreInputValidation.validate(body);
            if (error) return res.status(400).send({ 'code': 0, 'result': error.details[0].message });
            UserLikeStore(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                return res.send({ 'code': 1, 'result': results });
            });
        } catch (error) {

        }
    }
};