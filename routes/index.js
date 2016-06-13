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
    res.render('add data', {title: 'Detta är sidan där du lägger till dagar'});
});

module.exports = router;
