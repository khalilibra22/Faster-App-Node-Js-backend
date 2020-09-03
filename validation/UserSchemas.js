const Joi = require('@hapi/joi');

const UserInfoInput = Joi.object({
    FullName: Joi.string().min(2).max(30),
    Email: Joi.string().min(3).max(20).required(),
    Phone: Joi.string().min(5).max(20).required(),
    Pass: Joi.string().min(5).max(20).required(),
    Address: Joi.string().min(5).max(3000),
    UserLat: Joi.number(),
    Userlong: Joi.number()
});

const UserPosition = Joi.object({
    UserID: Joi.number().required(),
    UserLat: Joi.number().required(),
    Userlong: Joi.number().required()
});

const UserSetInfo = Joi.object({
    UserID: Joi.number().required(),
    FullName: Joi.string().min(2).max(30).required(),
    Email: Joi.string().min(3).max(20).required(),
    Phone: Joi.string().min(5).max(20).required(),
    Address: Joi.string().min(5).max(3000).required(),
    UserLat: Joi.number(),
    Userlong: Joi.number()
});

const UserLoginInput = Joi.object({

    email: Joi.string().min(3).max(20).required(),
    UserPassword: Joi.string().min(5).max(20).required()
});

module.exports = {
    UserInfoValidaton: UserInfoInput,
    UserPositionValidation: UserPosition,
    UserSetInfoValidation: UserSetInfo,
    UserLoginInputValidation: UserLoginInput
};