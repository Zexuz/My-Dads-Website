var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Statistik',
        p: 'Detta är sidan där du söker efter en period och ser en graf över den perioden'
    });
});

/* GET Add data page. */
router.get('/add', function (req, res, next) {
    res.render('add data', {
        title: 'Lägg till dag',
        btnId: 'addDataBtn',
        btnText: 'Lägg till information!',
    });
});

router.get('/list', function (req, res, next) {
    res.render('list', {
        title: 'Databasen',
        p: 'Om du klickar på en dag så kan du ändra värderna om du råkade göra fel när du skrev in dom'
    });
});

// TODO create data class to handel the url conversion for the data 
router.get('/update/:year/:month/:day/:houseEnergy/:pumpEnergy/:brineIn/:brineOut/:outTemp/:runtTime/:warmWater', function (req, res, next) {
    res.render('add data', {
        title: 'Updatera data',
        btnId: 'updateDataBtn',
        btnText: 'Uppdatera information!',
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
        houseEnergy: req.params.houseEnergy,
        pumpEnergy: req.params.pumpEnergy,
        brineIn: req.params.brineIn,
        brineOut: req.params.brineOut,
        outTemp: req.params.outTemp,
        runtTime: req.params.runtTime,
        warmWater: req.params.warmWater
    });
});

module.exports = router;
