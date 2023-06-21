const fs = require('fs');
const qr = require('qr-image');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
})

app.get("/generatedQR.png", function (req, res) {
      res.sendFile(__dirname + "/generatedQR.png");
})

app.post("/", function (req, res) {
      var qr_svg = qr.image(req.body.url);
      qr_svg.pipe(fs.createWriteStream('generatedQR.png'));
      res.sendFile(__dirname + "/index.html");
})

app.post("/download", function (req, res) {
      res.download(__dirname + "/generatedQR.png")
})

app.listen(3000, function () {
      console.log("Server started on port 3000");
})
