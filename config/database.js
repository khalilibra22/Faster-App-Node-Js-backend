const mysql =require('mysql');

const Connect = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER_USERS,
    password : process.env.PASS_USERS,
    port: process.env.PORT,
    database : process.env.DATABASE
});

const UserPool = mysql.createPool({
    host : process.env.HOST,
    user : process.env.USER_USERS,
    password : process.env.PASS_USERS,
    port: process.env.PORT,
    database : process.env.DATABASE,
    connectionLimit : process.env.CONNECTION_LIMIT
});
const SellerPool = mysql.createPool({
    host : process.env.HOST,
    user : process.env.USER_SELLERS,
    password : process.env.PASS_SELLERS,
    port: process.env.PORT,
    database : process.env.DATABASE,
    connectionLimit : process.env.CONNECTION_LIMIT
});

module.exports = {
    Connect : Connect,
    UserConnection : UserPool,
    Selleronnection : SellerPool
};