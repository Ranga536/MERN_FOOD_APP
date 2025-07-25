// const admin = require("firebase-admin");
// const serviceAccount = require("../service-account-key.json"); // Adjust path if needed

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// module.exports = admin;


const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

// Decode the base64 string from .env
const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!base64) throw new Error("Firebase base64 env missing");

const decoded = Buffer.from(base64, "base64").toString("utf-8");
const serviceAccount = JSON.parse(decoded);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;


// This code initializes Firebase Admin SDK using a service account key stored in an environment variable.
// It decodes the base64-encoded service account key and initializes the Firebase app if it