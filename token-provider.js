const credentials = require("fs").readFileSync("./credentials.properties");
const url = (/here\.token\.endpoint\.url\s*=\s*([\S]*)/g).exec(credentials)[1];
const consumerKey = (/here\.access\.key\.id\s*=\s*([\S]*)/g).exec(credentials)[1];
const secretKey = (/here\.access\.key\.secret\s*=\s*([\S]*)/g).exec(credentials)[1];
const scope = ((/here\.token\.scope\s*=\s*([\S]*)/g).exec(credentials) || [])[1];