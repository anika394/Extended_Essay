const moment = require('moment');
const CryptoJS = require("crypto-js");

exports.aes = async(event) => {
    console.log('aes_enc function running')
    let usr_request = {
        message: event.queryStringParameters && event.queryStringParameters.msg,
        aes_key: event.queryStringParameters && event.queryStringParameters.aes_key,
    };

    var new_msg;

    var returned_msg = "did not encrypt";

    if (usr_request.aes_key !== null && usr_request.message !== null) {
        let enc_msg = CryptoJS.AES.encrypt(usr_request.message, usr_request.aes_key);
        new_msg = enc_msg.toString();
        returned_msg = "Original Message: " + usr_request.message + " || Encrypted Message: " + new_msg + " || Key: " + usr_request.aes_key;
    } else {
        console.log("did not encrypt");
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(returned_msg)
    };

    return response;
}