var express = require('express');
var router = express.Router();
var db = require('../db'); // Veritabanı bağlantınızın olduğu dosya

// Kullanıcıları listele

router.get('/users', function(req, res) {
    db.query('SELECT * FROM users', function(error, results) {
        if (error) throw error;
        res.json(results);
    });
});

// Kullanıcı sil

router.delete('/users/:id', function(req, res) {
    var userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], function(error, results) {
        if (error) throw error;
        res.send('Kullanıcı silindi.');
    });
});

// Arabaları listele

router.get('/cars', function(req, res) {
    db.query('SELECT * FROM cars', function(error, results) {
        if (error) throw error;
        res.json(results);
    });
});

// Araba sil

router.delete('/cars/:id', function(req, res) {
    var carId = req.params.id;
    db.query('DELETE FROM cars WHERE id = ?', [carId], function(error, results) {
        if (error) throw error;
        res.send('Araba silindi.');
    });
});

module.exports = router;
