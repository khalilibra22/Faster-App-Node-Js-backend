const Joi = require('@hapi/joi');
const {
    GetSellerByID,
    CreateSeller,
    SetSellerInfo,
    GetSellerPassword,
    GetSellerByEmail,
    SetSellerPosition,
    CheckSellerCode,
    ChangeCodeStatue
}
    = require('./sellers-service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {
    SellerInfoInputValidation,
    SellerSetInfoValidation,
    SellerLoginInputValidation
} = require('../../validation/SellerSchemas');
const { sign } = require('jsonwebtoken');
//const nodemailer = require('nodemailer');


module.exports = {

    ChangeCodeStatueControl: (req, res) => {
        try {
            const body = req.body;
            ChangeCodeStatue(body, (err, results) => {
                if (err) return res.status(400).send(err);
                //if (results[0][0].length == 0) res.status(404).send({ code: 0, message: 'not found' });
                return res.status(200).send({ 'code': 1, 'message': 'updated!!' });
            });
        } catch (e) { }
    },

    CheckSellerCodeControl: (req, res) => {

        try {
            const body = req.body;
            CheckSellerCode(body, (err, results) => {
                if (err) return res.status(400).send(err);
                //if (results[0][0].length == 0) res.status(404).send({ code: 0, message: 'not found' });
                return res.status(200).send({ 'code': 1, 'message': results[0] });
            });
        } catch (e) { }

    },

    SetSellerPasswordControl: (req, res) => {

        const body = req.body;
        GetSellerByEmail(body.email, (err, result) => {
            try {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (result[0].length == 0) return res.status(404).send({ 'code': 0, 'message': 'email not found' });
                if (result[0][0].SellerPhoneNumber != body.SellerPhoneNumber) return res.status(404).send({ 'code': 0, 'message': 'phone number not found' });
                return res.status(200).send({ 'code': 1, 'message': 'exist' });
            } catch (e) {
                console.log(e.message);
            }
        });



    },

    SetSellerPositionControl: (req, res) => {
        try {

            const body = req.body;
            SetSellerPosition(body, (err, results) => {
                if (err) return res.status(400).send(err);
                //if (!results[0][0]) res.status(404).send({ code: 0, message: 'not found' });
                return res.status(200).send({ code: 1, message: 'updated!!' });
            });

        } catch (e) { }

    },

    GetSellerByEmailControl: (req, res) => {
        try {
            const body = req.body;
            //const { error, value } = SellerLoginInputValidation.validate(body);
            //if (error) return res.status(400).send(error.details[0].message);
            GetSellerByEmail(body.email, (err, result) => {
                try {
                    if (err) return res.status(400).send({ 'code': 0, 'message': err });
                    if (result[0].length != 0) return res.status(404).send({ 'code': 0, 'message': 'email used already' });
                    return res.status(200).send({ 'code': 1, 'result': 'enter your email' });
                } catch (e) {
                    console.log(e.message);
                }
            });

        } catch (e) { }


    },

    Login: (req, res) => {



        try {
            const body = req.body;
            const { error, value } = SellerLoginInputValidation.validate(body);
            if (error) return res.status(400).send(error.details[0].message);
            GetSellerByEmail(body.email, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (results[0].length == 0) return res.status(404).send({ 'code': 0, 'message': ' seller not found' });
                const CheckPassword = compareSync(body.SellerPassword, results[0][0].SellerPassword);
                if (CheckPassword) {
                    results[0][0].SellerPassword = undefined;
                    const JsonToken = sign({ resul: results[0][0] }, process.env.SELLER_KEY);
                    return res.status(200).send({ 'code': 1, 'SellerID': results[0][0].SellerID, 'SellerToken': JsonToken });
                }
                else return res.status(404).send({ 'code': 0, 'message': ' seller not found' });

            });
        } catch (e) { }



    },

    GetSellerPasswordControl: (req, res) => {


        //console.log(SellerID);
        try {
            const SellerID = req.params.id;
            GetSellerPassword(SellerID, (err, results) => {
                if (err) return res.status(400).send(err);
                if (!results[0][0]) res.status(404).send({ code: 0, message: 'not found' });
                return res.status(200).send({ code: 1, message: 'password exist' });
            });
        }
        catch (e) {
            res.status(400).send({ code: 400, message: 'connection error' });
        };

    },

    SetSellerInfoControl: (req, res) => {
        try {

            const body = req.body;
            const { error, value } = SellerSetInfoValidation.validate(body);
            if (error) return res.status(400).send(error.details[0].message);
            SetSellerInfo(body, (err, results) => {
                if (err) return res.status(400).send({ 'code': 0, 'result': err });
                return res.status(200).send({ 'code': 1, 'message': results });
            });

        } catch (e) { }
    },

    CreatenewSellerControl: (req, res) => {

        try {
            const body = req.body;
            const { error, value } = SellerInfoInputValidation.validate(body);
            if (error) return res.status(400).send(error.details[0].message);

            /* GetSellerByEmail(body.SellerEmail, (err, result) => {
                if (err) return res.status(400).send({ 'code': 0, 'message': err });
                if (result[0].length != 0) return res.status(404).send({ 'code': 0, 'message': 'email used already' });
                //return res.status(200).send({'code' :1 , 'result' : 'enter your email'});            
            });
     */
            const salt = genSaltSync(10);
            body.SellerPass = hashSync(body.SellerPass, salt);
            CreateSeller(body, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': 'bad request' });
                return res.status(200).send({ 'code': 1, 'result': results });
            });
        } catch (e) { }

    },

    GetUserByIDControl: (req, res) => {
        try {
            const SellerID = req.params.id;
            console.log(SellerID);

            GetSellerByID(SellerID, (err, results) => {

                if (err) return res.status(400).send({ 'code': 0, 'message': 'Bad request' });
                //if(results[0] = '') return res.status(404).send({message : 'seller not found'});
                return res.send({ 'code': 1, 'result': results[0][0] });
            });
        } catch (e) { }
    }
};