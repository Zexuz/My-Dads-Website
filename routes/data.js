var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is where all the charts is ' });
});

/* GET Add data page. */
router.get('/add', function(req, res, next) {
    res.render('add data', { title: 'This is where you add data'});
});

/* GET special  */
router.get('/:id', function(req, res, next) {
    res.render('index', { title: 'This is where all the charts is ' ,text:req.params.id});
});



module.exports = router;
