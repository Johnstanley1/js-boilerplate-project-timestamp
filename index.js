// index.js
// where your node app starts

// init project
// var express = require('express');
// var app = express();

// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });
 

// app.get("/api/:date?", function(req, res) {
//   let dateParam = req.params.date;
//   let date;
  
//   if (!dateParam){
//     date = new Date();
//   }else if(!isNaN(Number(dateParam))){
//     date = new Date(Number(dateParam))
//   }else{
//     date = new Date(dateParam)
//   }
  
//   if(date.toString() === "Invalid Date"){
//       res.json({error: "Invalid Date"})
//   }
       
//   res.json({unix: date.getTime(), utc: date.toUTCString()})
// })

// init project
// require('dotenv').config();
// var express = require('express');
// var app = express();

// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC
// var cors = require('cors');
// app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

// // your first API endpoint...
// app.get('/api/hello', function (req, res) {
//   res.json({ greeting: 'hello API' });
// });


// app.get('/api/whoami', (req, res) => {
//   const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   const language = req.headers['accept-language'];
//   const software = req.headers['user-agent'];

//   res.json({
//     ipaddress: ipAddress,
//     language: language,
//     software: software
//   });
// });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const dns = require("dns");
// const app = express();

// // Basic Configuration
// const port = process.env.PORT || 3000;

// app.use(cors());

// app.use('/public', express.static(`${process.cwd()}/public`));

// app.get('/', function(req, res) {
//   res.sendFile(process.cwd() + '/views/index.html');
// });

// // Your first API endpoint
// app.get('/api/hello', function(req, res) {
//   res.json({ greeting: 'hello API' });
// });
  
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // In-memory storage
// let urls = [];
// let counter = 1;

// // POST endpoint to shorten URLs
// app.post("/api/shorturl", (req, res) => {
//   const original_url = req.body.url;

//     let urlObj;
//   try {
//     urlObj = new URL(original_url);
//   } catch (err) {
//     return res.json({ error: "invalid url" });
//   }

//   // Extract hostname (e.g. "www.google.com")
//   const hostname = urlObj.hostname;

//   // Verify with DNS lookup
//   dns.lookup(hostname, (err, address) => {
//     if (err || !address) {
//       return res.json({ error: "invalid url" });
//     }

//     // Domain exists — store and return
//     const short_url = counter++;
//     urls.push({ original_url, short_url });

//     res.json({ original_url, short_url });
//   });
// });

// // Redirect endpoint
// app.get("/api/shorturl/:short_url", (req, res) => {
//   const { short_url } = req.params;
//   const record = urls.find(u => u.short_url == short_url);

//   if (!record) return res.json({ error: "No short URL found" });
//   res.redirect(record.original_url);
// });


const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const multer = require('multer')


app.use(express.urlencoded({ extended: true })) // to read form data
app.use(express.json())

app.use(cors())
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Set up multer for handling file uploads (no saving to disk)
const upload = multer({ storage: multer.memoryStorage() });

// Handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
