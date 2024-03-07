const connection = require('../config/database.js');

class Model_keahlian {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT keahlian.*, mahasiswa.nama_depan AS mahasiswa_nama_depan FROM keahlian JOIN mahasiswa ON keahlian.id_mahasiswa = mahasiswa.id_mahasiswa', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Store(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO keahlian SET ?', data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM keahlian WHERE id_keahlian = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE keahlian SET ? WHERE id_keahlian = ?', [data, id], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async Delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM keahlian WHERE id_keahlian = ?', id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Model_keahlian;
