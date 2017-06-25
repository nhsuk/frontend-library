var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  console.log('HIT');
  res.render('index.html', {
    title : "Sample Node Express + Nunjucks app"
  });
});

module.exports = router;
