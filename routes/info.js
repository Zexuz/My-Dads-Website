var express = require('express');
var router = express.Router();
var LocalDate = require('js-joda').LocalDate;

var Data = require('./../lib/Data');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'This is where all the charts is '});
});

/* GET Add data page. */
router.get('/add', function (req, res, next) {
    res.render('add data', {title: 'This is where you add data'});
});

router.get('/:start/:end', function (req, res, next) {
    var db = req.app.locals.db;

    var startArray = req.params.start.split('-');
    var endArray = req.params.end.split('-');

    if(startArray[1] == undefined) startArray[1] = 1;
    if(startArray[2] == undefined) startArray[2] = 1;

    if(endArray[1] == undefined) endArray[1] = 1;
    if(endArray[2] == undefined) endArray[2] = 1;

    var startTime = new Date(startArray[0],startArray[1],startArray[2]).getTime();
    var endTime = new Date(endArray[0],endArray[1],endArray[2]).getTime();

    var dadCollection = db.collection('datapoints');

    dadCollection.find({_id: {$lt: endTime, $gt: startTime}}).toArray(function (err, documents) {
        res.send({response: {success: true, data: documents}});
    });
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
        var date= new Date(document.year, document.month, document.day).getTime();

        console.log(document.year, document.month, document.day);
        document._id = new Date(document.year, document.month, document.day).getTime();
        console.log(document._id);

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
