var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Statistik',
        p: 'Detta är sidan där du söker efter en period och ser en graf över den perioden'
    });
});

module.exports = router;
