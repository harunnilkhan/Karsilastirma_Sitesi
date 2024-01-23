const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const db = require('./db');
const authRoutes = require('./routes/auth');
const carsRoutes = require('./routes/cars');
const adminRoutes = require('./routes/admin'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,  
    password VARCHAR(255) NOT NULL
  )`, (err, result) => {
    if (err) {
      console.error('Veritabanı tablosu oluşturulurken bir hata oluştu:', err);
    } else {
      console.log('Veritabanı tablosu oluşturuldu.');
    }
  });

app.use('/auth', authRoutes);
app.use('/cars', carsRoutes);
app.use('/admin', adminRoutes); 
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/auth/login', (req, res) => {

  const { username, password } = req.body;
  req.session.user = { username ,isAdmin }; 
  res.redirect('/addCar');  
});

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Giriş yapmanız gerekiyor.' });
    }
  };
  
  
app.get('/get-user-info', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user, isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.post('/addCar', isAuthenticated, (req, res) => {
    const { carBrand, carModel, carYear, carPrice } = req.body;
  
    db.query(
      'INSERT INTO cars (brand, model, year, price) VALUES (?, ?, ?, ?)',
      [carBrand, carModel, carYear, carPrice],
      (err, result) => {
        if (err) {
          console.error('Araba eklenirken bir hata oluştu:', err);
          res.json({ success: false, message: 'Araba eklenirken bir hata oluştu.' });
        } else {
          console.log('Araba başarıyla eklendi.');
          res.json({ success: true, message: 'Araba başarıyla eklendi.' });
        }
      }
    );
  });
  


app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} portunda çalışıyor.`);
});
