/*jshint esversion: 11 */
const connection = require('../config/database.js');

class Model_mahasiswa {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('select * from mahasiswa order by id_mahasiswa desc', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Store(Data) {
    return new Promise((resolve, reject) => {
      connection.query('insert into mahasiswa set ?', Data, function (err, result) {
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
      connection.query('select * from mahasiswa where id_mahasiswa = ' + id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Update(id, Data) {
    return new Promise((resolve, reject) => {
      connection.query('update mahasiswa set ? where id_mahasiswa = ' + id, Data, function (err, result) {
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
      connection.query('delete from mahasiswa where id_mahasiswa = ' + id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Model_mahasiswa;
