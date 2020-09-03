
var admin = require("firebase-admin");

var serviceAccount = require('../fasterbusinessnodejsnotifiy-firebase-adminsdk-dkou6-96b622f7ce.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fasterbusinessnodejsnotifiy.firebaseio.com"
});


//let token = 'du-JDB71SnSRylS8SUlxb1:APA91bFFJZhtx6mTzeWLsp3yXqWTxhuhP4kFRooVhZNPQrc8KV-9B_W24n58DK5WUsaTfDpRvUqgOfCGbY0KbCTO-MIjbwXrKVubUf8R5G_rYwb6eFdl3S57c8hqktFc6PmG4tcWXePP';
const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};
const payload = {
    notification: {
        title: "Nouvelle commande",
        body: "Entrer et voir votre nouvelle commande",
    },
};



module.exports = {

    sellerNotification: (token) => {

        admin.messaging().sendToDevice(token, payload, options)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });

    }


};