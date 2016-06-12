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
    var db = req.app.locals.db;

    console.log(req.params.id);
    var dadCollection = db.collection('datapoints');
    dadCollection.findOne({_id: req.params.id}, function (err, document) {
        res.send({response: {success: true, data: document}});
    });
});


// TODO create data class to handel the url conversion for the data 
router.post('/:year/:month/:day/:houseEnergy/:pumpEnergy/:brineIn/:brineOut/:outTemp/:runtTime/:warmWater', function (req, res, next) {
    var data = new Data(req.params);
    console.log(data.isValid());

    if (data.isValid()) {

        var db = req.app.locals.db;

        var document = data.data;
        document._id = document.year + "-" + document.month + "-" + document.day;

        var dadCollection = db.collection('datapoints');
        dadCollection.insertOne(document).then(function () {
            res.send({response: {success: true, data: null}});

        }).catch(function () {
            res.send("Wrong data!");

        })

    } else {
        res.send("Wrong data!");
    }
});


module.exports = router;
