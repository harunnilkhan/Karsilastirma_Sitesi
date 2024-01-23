var express = require('express');
var router = express.Router();
var db = require('../db');

// Araba ekleme endpoint'i

router.post('/addCar', function(req, res) {
    var car = req.body;
    var query = 'INSERT INTO cars (brand, model, year, price, engine_capacity, horsepower, torque, fuel_type, transmission_type, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [car.brand, car.model, car.year, car.price, car.engine_capacity, car.horsepower, car.torque, car.fuel_type, car.transmission_type, car.weight], function(error, results, fields) {
        if (error) {
            res.status(500).send('Veritabanına ekleme sırasında bir hata oluştu: ' + error);
            return;
        }
        res.status(200).send('Araba başarıyla eklendi.');
    });
});

// Tüm arabaların listesini döndüren endpoint

router.get('/', function(req, res) {
    db.query('SELECT id, brand, model, year FROM cars', function(error, results) {
        if (error) {
            res.status(500).send('Veritabanı hatası: ' + error);
            return;
        }
        res.json(results);
    });
});

// Belirli bir ID'ye sahip arabanın detaylarını döndüren endpoint

router.get('/:id', function(req, res) {
    const carId = req.params.id;
    db.query('SELECT * FROM cars WHERE id = ?', [carId], function(error, results) {
        if (error) {
            res.status(500).send('Veritabanı hatası: ' + error);
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Araba bulunamadı');
        }
    });
});

module.exports = router;
