const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');


const app = express()

/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: './public'})
});

app.post('/monupload', upload.array('monfichier', 3), function (req, res, next) {
  // traitement du formulaire
  if (req.files.size > 3*1000000) {
    res.end('Votre fichier doit etre moins de 3 mo')
    return 
  }
  fs.rename(req.files.path, 'public/images/' + req.files.originalname, function(err){
    if (err) {
      res.send('probleme durant le deplacement');
    } else {
      res.send('Fichier uplode avec succes');
    }
  });
})

app.listen(3000)
