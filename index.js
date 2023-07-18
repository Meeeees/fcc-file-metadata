var express = require('express');
// enable express file upload
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config()

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
const { upfile }  = req.files
  res.json({ name: upfile.name, type: upfile.mimetype, size: upfile.size })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
