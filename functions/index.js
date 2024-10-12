/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {email, subject, message} = req.body;

      const msg = {
        to: email,
        from: "crh549636158@gmail.com",
        subject: subject,
        text: message,
      };

      await sgMail.send(msg);
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error.message);
      res.status(500).send("Error sending email");
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
