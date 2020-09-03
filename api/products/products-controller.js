const Joi = require('@hapi/joi');
const {
    AddNewProduct,
    DeleteProduct,
    SetProduct,
    GetSellerProducts,
    GetLikedSellerProductsToUser,
    GetProductsBasedUserLocation,
    GetProductById,
    GetSellerProducts2Users,
    GetProductsCollection,
    GetProductsByCategory
} = require('./products-service');
const { ProductInputValidation, SetProductValidation } = require('../../validation/ProductSchemas');

module.exports = {

    GetProductsByCategoryControl: (req, res) => {
        try {
            const categoryId = req.params.id;
            GetProductsByCategory(categoryId, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                //if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }

    },

    GetProductsCollectionControl: (req, res) => {

        try {
            GetProductsCollection((err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }
    },

    GetSellerProducts2UsersControl: (req, res) => {

        try {
            const SellerId = req.params.id;
            GetSellerProducts2Users(SellerId, (err, results) => {

                if (err) return res.status(400).send(err);
                return res.send(results);
            });
        } catch (error) {

        }
    },

    GetProductByIdControl: (req, res) => {

        try {
            const ProductId = req.params.id;
            GetProductById(ProductId, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });

                return res.send({ 'code': 1, 'result': results[0][0] });
            });
        } catch (error) {

        }
    },

    GetProductBasedUserLocationControl: (req, res) => {

        try {
            const UserId = req.params.id;
            GetProductsBasedUserLocation(UserId, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });

        } catch (error) {

        }
    },

    GetLikedSellerProductsToUserControl: (req, res) => {

        try {
            const UserId = req.params.id;
            GetLikedSellerProductsToUser(UserId, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ 'code': 0, 'result': 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }
    },

    GetSellerProductsControl: (req, res) => {

        try {
            const SellerId = req.params.id;
            GetSellerProducts(SellerId, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                //if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) {

        }

    },

    SetProductControl: (req, res) => {

        try {
            const body = req.body;
            const { error, value } = SetProductValidation.validate(body);
            if (error) return res.status(400).send(error.details[0].message);
            SetProduct(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                return res.status(200).send({ 'code': 1, 'message': results });
            });
        } catch (error) {

        }
    },

    DeleteProductControl: (req, res) => {

        try {
            const body = req.body;
            DeleteProduct(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });

                return res.status(200).send({ 'code': 1, 'message': results });
            });
        } catch (error) {

        }
    },

    AddNewProductControl: (req, res) => {

        try {
            const body = req.body;
            const { error, value } = ProductInputValidation.validate(body);
            if (error) return res.status(400).send(error.details[0].message);
            AddNewProduct(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                return res.status(200).send({ "code": 1, "result": "added successfully" });
            });
        } catch (error) {

        }
    }

};