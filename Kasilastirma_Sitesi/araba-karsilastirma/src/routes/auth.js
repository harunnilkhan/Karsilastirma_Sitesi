const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/checkUnique', (req, res) => {
    const { username, email } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, result) => {
      if (err) {
        console.error('Veritabanı sorgusu hatası:', err);
        res.json({ isUnique: false, error: 'Veritabanı sorgusu hatası' });
        return;
      }
  
      if (result.length === 0) {
        res.json({ isUnique: true });
      } else {
        res.json({ isUnique: false });
      }
    });
  });


router.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Eksik bilgi!' });
  }

  db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu.' });
    }

    res.status(200).json({ message: 'Kayıt başarılı!' });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Eksik bilgi!' });
  }

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Giriş sırasında bir hata oluştu.' });
    }

    if (result.length > 0) {
      const user = result[0];
      req.session.user = { username: user.username, isAdmin: user.isAdmin };
      res.status(200).json({ message: 'Giriş başarılı!', isAdmin: user.isAdmin });
    } else {
      res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı!' });
    }
  });
});

module.exports = router;
