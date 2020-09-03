const Joi = require('@hapi/joi');
const {
    CreateOrder,
    CompleteOrder,
    GetSellerActiveOrders,
    GetSellerOrderPerUser,
    GetLast_15UserOrders,
    SetOrderDeliveryTime

} = require('./orders-service');
const { OrderInfoInputValidaton } = require('../../validation/OrderSchemas');

const { sellerNotification } = require('../../config/notification');


module.exports = {

    SetOrderDeliveryTimeControl: (req, res) => {

        try {
            const body = req.body;
            SetOrderDeliveryTime(body, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                return res.status(200).send({ 'code': 1, 'result': results });
            });
        } catch (e) { }

    },


    GetLast_15UserOrdersControl: (req, res) => {

        try {
            const UserId = req.params.id;
            GetLast_15UserOrders(UserId, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (e) { }
    },

    GetSellerOrderPerUserControl: (req, res) => {

        try {
            const OrderId = req.params.id;
            GetSellerOrderPerUser(OrderId, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (e) { }
    },

    GetSellerActiveOrdersControl: (req, res) => {

        try {
            const SellerId = req.params.id;
            GetSellerActiveOrders(SellerId, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                return res.send({ 'code': 1, 'result': results[0] });
            });
        } catch (error) { }
    },

    CompleteOrderControl: (req, res) => {

        try {
            const body = req.body;
            CompleteOrder(body, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                return res.status(200).send({ 'code': 1, 'result': results });
            });
        } catch (error) { }
    },

    CreateOrderControl: (req, res) => {
        try {
            const body = req.body;
            const { error, value } = OrderInfoInputValidaton.validate(body);
            if (error) return res.status(404).send({ 'code': 0, 'result': error.details[0].message });
            CreateOrder(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                sellerNotification(body.notificationToken);
                return res.status(200).send({ 'code': 1, 'result': results });

            });
        } catch (error) { }
    }

};