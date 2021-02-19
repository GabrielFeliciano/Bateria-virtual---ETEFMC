var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.header("Content-Type", "text/javascript");
  res.sendFile(path.join(__dirname + '/../public/web/index.html'))
});

module.exports = router;
