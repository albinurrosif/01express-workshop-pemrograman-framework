/*jshint esversion: 11 */
const connection = require('../config/database');

class Model_kategori {
  //mengambil data dari tabel
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('select * from kategori2 order by id_kategori desc', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  //menyimpan data kedalam tabel
  static async Store(Data) {
    return new Promise((resolve, reject) => {
      connection.query('insert into kategori2 set ?', Data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  //mengambil data berdasarkan ID dari tabel
  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query('select * from kategori2 where id_kategori = ' + id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  //memperbarui data berdasarkan ID dari tabel
  static async Update(id, Data) {
    return new Promise((resolve, reject) => {
      connection.query('update kategori2 set ? where id_kategori = ' + id, Data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  //menghapus data dari tabel
  static async Delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('delete from kategori2 where id_kategori = ' + id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Model_kategori;
