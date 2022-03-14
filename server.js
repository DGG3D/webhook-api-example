var express = require("express")
var bodyParser = require("body-parser")
var crypto = require("crypto")

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, () => {
  console.log("Server running on port 8080")
});

app.post("/", (req, res) => {
  const signature = req.headers.signature
  const secret = 'secret'
  const bodyString = JSON.stringify(req.body)
  const bodyEscaped = bodyString.replaceAll('/', '\\/')

  const calculatedSignature = crypto
        .createHmac("sha256", secret)
        .update(bodyEscaped)
        .digest("hex")

  console.log('signature', signature)
  console.log('calculated signature', calculatedSignature)

  const valid = signature == calculatedSignature
  console.log('valid', valid)
  res.sendStatus(200)
});
