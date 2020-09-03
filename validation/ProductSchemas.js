const Joi = require('@hapi/joi');

const ProductInput = Joi.object({

    ProductName: Joi.string().min(5).max(30).required(),
    SellPrice: Joi.number().required(),
    TimeOfAdd: Joi.date().required(),
    SellerID: Joi.number().required(),
    CategoryID: Joi.number().required(),
    Images: Joi.string().required(),
    ProdDescription: Joi.string().required().min(10)
});

const SetProduct = Joi.object({

    ProductID: Joi.number().required(),
    ProductName: Joi.string().min(3).max(30).required(),
    SellPrice: Joi.number().required(),
    CategoryID: Joi.number().required(),
    ProdDescription: Joi.string().required().min(10)

});

module.exports = {

    ProductInputValidation: ProductInput,
    SetProductValidation: SetProduct
};