const Joi = require('@hapi/joi');

const UserLikeStoreInput = Joi.object({
    UserID : Joi.number().required(),
    SellerID :Joi.number().required() 
});


module.exports = {
    
    UserLikeStoreInputValidation : UserLikeStoreInput

};