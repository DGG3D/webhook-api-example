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
  
  // This is the secret you entered when adding the webhook on RapidCompact.
  const secret = 'secret' 
  
  const bodyString = JSON.stringify(req.body)
  console.log(bodyString)
  
  // NOTE: This is necessary, as our webhook server is escaping `/` before signing the request.
  const bodyEscaped = bodyString.replaceAll('/', '\\/') 

  // Calculate the HMAC signature using SHA256 and the given secret.
  const calculatedSignature = crypto
        .createHmac("sha256", secret)
        .update(bodyEscaped)
        .digest("hex")

  // Check if the signature is valid.
  const valid = signature == calculatedSignature
  console.log('signature valid:', valid)
  
  // Here you can respond differently depending on if the signature is valid or not.
  res.sendStatus(200)
});
