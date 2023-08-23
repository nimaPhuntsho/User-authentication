const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const route = process.env.PORT || 3000;

// import firebase-admin package
const admin = require("firebase-admin");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import service account file (helps to know the firebase project details)
const serviceAccount = require("./test-6bed6-firebase-adminsdk-ms3qk-5e4c7e678e.json");
const exp = require("constants");

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(cors());
var jsonParser = bodyParser.json();
app.listen(3000, () => {
  `running on port 3000`;
});
let auth = admin.auth();

app.get("/", (req, res) => {
  let userId = req.params.id;
  const roles = {
    isAdmin: true,
  };
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/login", (req, res) => {
  let adminUid = "zTWtrVLAHRSrPDMzBWYoE3gcT103";
  let id = req.body.id;
  const roles = {
    isAdmin: true,
  };
  if (id === adminUid) {
    auth.createCustomToken(adminUid, roles).then((customToken) => {
      res.send({ token: customToken });
    });
  } else {
    auth
      .createCustomToken(id, { isAdmin: (roles.isAdmin = false) })
      .then((customToken) => {
        res.send({ token: customToken });
      });
  }
});
