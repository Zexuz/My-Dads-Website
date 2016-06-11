var express = require('express');
var router = express.Router();

var Data = require('./../lib/Data');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'This is where all the charts is '});
});

/* GET Add data page. */
router.get('/add', function (req, res, next) {
    res.render('add data', {title: 'This is where you add data'});
});

/* GET special  */
router.get('/:id', function (req, res, next) {
    res.render('index', {title: 'This is where all the charts is ', text: req.params.id});
});


// TODO create data class to handel the url conversion for the data 
router.post('/:year/:month/:day/:houseEnergy/:pumpEnergy/:brineIn/:brineOut/:outTemp', function (req, res, next) {
    var data = new Data(req.params);
    console.log(data.isValid());

    if (data.isValid())
        res.send("Hello");
    else{
        res.send("Wrong data!");
    }
});


module.exports = router;
