const moment = require('moment');
const CryptoJS = require("crypto-js");
const NodeRSA = require('node-rsa');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-1'})

exports.all_enc = async(event) => {
    console.log('all_enc function running')
    let usr_request = {
        encryption_type: event.queryStringParameters && event.queryStringParameters.enctype,
        message: event.queryStringParameters && event.queryStringParameters.msg,
    };

    var new_msg;
    
    var key;

    var aes_key = event.queryStringParameters && event.queryStringParameters.aes_key;;
    var rsa_key = new NodeRSA({b: 512}); //e: 65537;
    var des_key = event.queryStringParameters && event.queryStringParameters.des_key;

    var returned_msg = "did not encrypt";

    if (usr_request.encryption_type === 'AES' && aes_key !== null) {
        let enc_msg = CryptoJS.AES.encrypt(usr_request.message, aes_key);
        new_msg = enc_msg.toString();
        key = aes_key;
        returned_msg = "Original Message: " + usr_request.message + " || Encryption Type: " + usr_request.encryption_type + " || Encrypted Message: " + new_msg + " || Key: " + key;
    } else if (usr_request.encryption_type === 'DES' && des_key !== null) {
        let enc_msg = CryptoJS.DES.encrypt(usr_request.message, des_key);
        new_msg = enc_msg.toString();
        key = des_key;
        returned_msg = "Original Message: " + usr_request.message + " || Encryption Type: " + usr_request.encryption_type + " || Encrypted Message: " + new_msg + " || Key: " + key;
    } else if (usr_request.encryption_type === 'RSA') {
        let enc_msg = rsa_key.encrypt(usr_request.message, 'base64');
        new_msg = enc_msg.toString();
        key = rsa_key;
        returned_msg = "Original Message: " + usr_request.message + " || Encryption Type: " + usr_request.encryption_type + " || Encrypted Message: " + new_msg;
    } else {
        console.log("did not encrypt");
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(returned_msg)
    };

    return response;
}