const {UserConnection} = require('../../config/database');

module.exports = {

    GetUserByEmail : async (email,callback) => {

        try{

            await UserConnection.query('CALL GetUserByEmail(?);',
            [email],(error , result ,fields) => {        
                if(error) return callback(error);
                return callback(null,result);
        });
        }catch(e){}
    },

    GetUserPosition : async (id,callback) => {

        try{

            await UserConnection.query("CALL GetUserByPosition(?)",
                    [id],(error , result ,fields) =>{        
                    if(error) return callback(error);
                    return callback(null,result);
            });
        }
        catch(e){}
    },

    SetUserPosition : async(data,callback) =>{

        try{

            await UserConnection.query('CALL SetUserPosition(?,?,?)',
            [
                data.UserID,
                data.UserLat,
                data.Userlong
            ],(error , result ,fields) =>{
                if(error) return callback(error);
                return callback(null,result);
            });
        }
        catch(e){}
    },

    SetUserInfo : async(data,callback) => {

        try{

            await UserConnection.query('CALL SetUserInformation(?,?,?,?,?,?,?)',
            [
                data.UserID,
                data.FullName,
                data.Email,
                data.Phone,
                data.Address,
                data.UserLat,
                data.Userlong
            ],(error , result ,fields) =>{
                if(error) return callback(error);
                return callback(null,result);
            });
        }
        catch(e){}
    },

    GetUserById : async (id , callback) =>{
        try{
            await UserConnection.query('CALL GetUserById(?)',
            [id],(error , result ,fields) =>{
                if(error) return callback(error);
                return callback(null,result);
            });

        }catch(e){}

    },
    
    CreateUser : async (data , callback) => {

        try{
            await UserConnection.query('CALL AddNewUser(?,?,?,?,?,?,?)',
            [
                data.FullName,
                data.Email,
                data.Phone,
                data.Pass,
                data.Address,
                data.UserLat,
                data.Userlong
            ],(error , result ,fields) =>{
                if(error) return callback(error);
                return callback(null,result);
            });
        }
        catch(e){}
    }

};
