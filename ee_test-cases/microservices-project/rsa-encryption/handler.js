const moment = require('moment');
const NodeRSA = require('node-rsa');

exports.rsa = async(event) => {
    console.log('rsa_enc function running')
    let usr_request = {
        message: event.queryStringParameters && event.queryStringParameters.msg,
    };

    var new_msg;
    
    var rsa_key = new NodeRSA({b: 512}); //e: 65537

    var returned_msg = "did not encrypt";

    if (usr_request.message !== null) {
        let enc_msg = rsa_key.encrypt(usr_request.message, 'base64');
        new_msg = enc_msg.toString();
        returned_msg = "Original Message: " + usr_request.message + " || Encrypted Message: " + new_msg;
    } else {
        console.log("did not encrypt");
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(returned_msg)
    };

    return response;
}