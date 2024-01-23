const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'araba_karsilastirma',
});

db.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası: ' + err.stack);
    return;
  }
  console.log('Veritabanına bağlandı. ID: ' + db.threadId);
});

module.exports = db;
