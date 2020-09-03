const Joi = require('@hapi/joi');

const OrderInfoInput = Joi.object({

    UserID: Joi.number().required(),
    SellerID: Joi.number().required(),
    RecipientName: Joi.string().min(5).max(30).required(),
    RecipientPhone: Joi.string().min(5).max(20).required(),
    RecipientAddress: Joi.string().max(3000),
    RecipientLocLat: Joi.number(),
    RecipientLocLong: Joi.number(),
    OrderDeliveryTime: Joi.date(),
    OrderCreationTime: Joi.date().required(),
    products: Joi.array().required(),
    notificationToken: Joi.string().required()
});

module.exports = {

    OrderInfoInputValidaton: OrderInfoInput

}