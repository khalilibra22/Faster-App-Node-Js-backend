const Joi = require('@hapi/joi');

const SellerLoginInput = Joi.object({
    email: Joi.string().min(5).max(20).required(),
    SellerPassword: Joi.string().min(5).max(30).required()

});

const SellerInfoInput = Joi.object({

    SellerStorename: Joi.string().min(5).max(30).required(),
    SellerFullName: Joi.string().min(5).max(30).required(),
    SellerEmail: Joi.string().min(5).max(20).required(),
    SellerPhone: Joi.string().min(5).max(20).required(),
    SellerPass: Joi.string().min(5).max(30).required(),
    SellerAddress: Joi.string().min(5).max(3000).required(),
    SellerImgURL: Joi.string().min(5).max(500).required(),
    //SellerRating : Joi.number().required(),
    SellerLat: Joi.number().required(),
    Sellerlong: Joi.number().required(),
    DeliveryTime: Joi.number().required(),
    notificationToken: Joi.string().required()
    //ContratExpiration: Joi.date().required()
});

const SellerSetInfo = Joi.object({
    SellerID: Joi.number().required(),
    SellerStorename: Joi.string().min(5).max(30).required(),
    SellerFullName: Joi.string().min(5).max(30).required(),
    SellerEmail: Joi.string().min(5).max(20).required(),
    SellerPhone: Joi.string().min(5).max(20).required(),
    SellerAddress: Joi.string().min(5).max(3000).required(),
    DeliveryTime: Joi.number().required(),
});

module.exports = {

    SellerInfoInputValidation: SellerInfoInput,
    SellerSetInfoValidation: SellerSetInfo,
    SellerLoginInputValidation: SellerLoginInput
}