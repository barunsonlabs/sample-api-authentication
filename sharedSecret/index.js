require("dotenv").config()

const cryptoJS = require("crypto-js")
const request = require("request")

// Sample json
var jsonSample = {
    "email": "noreply@barunsonlabs.com",
    "name": "BARUNSONLABS GLOBAL"
}

var jsonString = JSON.stringify(jsonSample)

/**
 * zero fill
 */
function zerofill(value) {
    return ("0" + value.toString()).slice(-2)
}

/**
 * yyyymmddhhii format
 * UTC timezone
 */
const now = new Date();

var yearString = now.getUTCFullYear();
var monthString = zerofill(now.getUTCMonth() + 1);
var dateString = zerofill(now.getUTCDate());
var hourString = zerofill(now.getUTCHours());
var minuteString = zerofill(now.getUTCMinutes());
var timeString = yearString +  monthString + dateString + hourString + minuteString;

var hash = cryptoJS.HmacSHA256(timeString + jsonString, process.env.SHARED_SECRET).toString(cryptoJS.enc.Hex)

const options = {
    uri: process.env.API_ENDPOINT,
    method: "POST",
    body: jsonSample,
    json: true,
    headers: {
        "X-Signature:": hash
    }
}

request(options, function(err, response) {
    if (err) { // Error
        console.log(err);
    } else { // Success!
        console.log(response);
    }
});