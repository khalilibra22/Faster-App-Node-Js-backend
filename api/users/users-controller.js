const Joi = require('@hapi/joi');
const {
    CreateUser,
    GetUserById,
    SetUserInfo,
    SetUserPosition,
    GetUserPosition,
    GetUserByEmail
} = require('./users-service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {
    UserInfoValidaton,
    UserPositionValidation,
    UserSetInfoValidation,
    UserLoginInputValidation
} = require('../../validation/UserSchemas');
const { sign } = require('jsonwebtoken');

module.exports = {

    GetUserbyEmailControl: (req, res) => {
        try {

            const body = req.body;
            GetUserByEmail(body.email, (err, result) => {
                try {
                    if (err) return res.status(400).send({ 'code': 0, 'message': err });
                    if (result[0].length != 0) return res.status(404).send({ 'code': 0, 'message': 'email used already' });
                    return res.status(200).send({ 'code': 1, 'result': 'enter your email' });
                } catch (e) {
                    console.log(e.message);
                }
            });

        } catch (error) {

        }


    },

    Login: (req, res) => {

        try {
            const body = req.body;
            const { error, value } = UserLoginInputValidation.validate(body);
            if (error) return res.status(400).send({ 'code': 0, 'message': error.details[0].message });
            GetUserByEmail(body.email, (err, results) => {

                if (err) return res.status(400).send(err);
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "message": ' user not found' });
                const CheckPassword = compareSync(body.UserPassword, results[0][0].UserPassword);
                if (CheckPassword) {
                    results[0][0].UserPassword = undefined;
                    const JsonToken = sign({ resul: results[0][0] }, process.env.USER_KEY);
                    return res.status(200).send({ "code": 1, "UserId": results[0][0].UserID, "UserToken": JsonToken });
                }
                else return res.status(404).send({ "code": 0, "message": 'user not found' });

            });
        } catch (e) { }

    },

    GetUserPosition: (req, res) => {
        const UserID = req.params.id;
        GetUserPosition(UserID, (err, results) => {

            try {
                if (err) return res.status(400).send(err);
                return res.send(results);
            } catch (e) { }

        });
    },

    SetUserPositionControl: (req, res) => {

        try {
            const body = req.body;
            const { error, value } = UserPositionValidation.validate(body);
            if (error) return res.status(400).send(error.details[0].message);
            SetUserPosition(body, (err, results) => {

                if (err) return res.status(400).send(err);
                return res.send(results);

            });
        } catch (e) { }
    },

    SetUserInfoControl: (req, res) => {

        try {

            const body = req.body;
            const { error, value } = UserSetInfoValidation.validate(body);
            if (error) return res.status(400).send({ 'code': 0, 'message': error.details[0].message });
            SetUserInfo(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                return res.send({ 'code': 1, 'result': results });

            });

        } catch (e) { }
    },

    GetUserbyIdContorl: (req, res) => {

        const UserID = req.params.id;
        GetUserById(UserID, (err, results) => {
            try {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ "code": 0, "result": 'not found' });
                return res.send({ 'code': 1, 'result': results[0][0] });

            } catch (e) { }


        });
    },

    CreateUserControl: (req, res) => {
        try {
            const body = req.body;
            const { error, value } = UserInfoValidaton.validate(body);
            if (error) return res.status(400).send(error.details[0].message);
            const salt = genSaltSync(10);
            body.Pass = hashSync(body.Pass, salt);
            CreateUser(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                return res.send({ code: 1, message: 'user added' });
            });
        } catch (e) { }
    }
};