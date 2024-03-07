var express = require('express');
var router = express.Router();

var connection = require('../config/database');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get('/', function (req, res, next) {
  connection.query('select * from produk order by id_produk desc', function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('produk', {
        data: '',
      });
    } else {
      res.render('produk/index', {
        data: rows,
      });

      //menampilkan dalam bentuk API dalam format dokumen Json
      // return res.status(200).json({
      //     status: true,
      //     message: 'Data Mahasiswa',
      //     data: rows
      // })
    }
  });
});

router.get('/create', function (req, res, next) {
  res.render('produk/create', {
    nama_produk: '',
    harga: '',
  });
});

router.post('/store', upload.single('foto_produk'), (req, res, next) => {
  try {
    let { nama_produk, harga } = req.body;
    let Data = {
      nama_produk,
      harga,
      foto_produk: req.file.filename,
    };
    connection.query('insert into produk set ?', Data, function (err, result) {
      if (err) {
        req.flash('error', 'Gagal menyimpan data ke database');
      } else {
        req.flash('success', 'Berhasil menyimpan data!');
      }
      res.redirect('/produk');
    });
  } catch {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/produk');
  }
});

router.get('/edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  connection.query('select * from produk where id_produk = ' + id, function (err, rows) {
    if (err) {
      req.flash('error', 'Kueri gagal! ');
    } else {
      res.render('produk/edit', {
        id: rows[0].id_produk,
        nama_produk: rows[0].nama_produk,
        harga: rows[0].harga,
      });

      // menampilkan dalam bentuk API dalam format dokumen Json
      // return res.status(200).json({
      //     status: true,
      //     message: 'Data Mahasiswa',
      //     data: rows[0]
      // })
    }
  });
});

router.post('/update/(:id)', upload.single('foto_produk'), function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_produk, harga } = req.body;
    let gambar = req.file ? req.file.filename : null;

    connection.query('select * from produk where id_produk = ${id}', function (err, rows) {
      const fileLama = rows[0].foto_produk;
      if (fileLama && gambar) {
        const pathFile = path.join(__dirname, '../public/images/', fileLama);
        fs.unlinkSync(pathFile);
      }

      let updateData = {
        nama_produk: nama_produk,
        harga: harga,
        foto_produk: gambar,
      };

      connection.query('update produk set ? where id_produk = ' + id, updateData, function (err, result) {
        if (err) {
          console.error('Gagal memperbarui data!', err);
          req.flash('error', 'Gagal memperbarui data!');
        } else {
          req.flash('success', 'Data berhasil diperbarui!');
        }
        res.redirect('/produk');
      });
    });
  } catch {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.render('/produk');
  }
});

router.get('/delete/(:id)', function (req, res, next) {
  let id = req.params.id;
  connection.query('select * from produk where id_produk = ' + id, function (err, rows) {
    const fileLama = rows[0].foto_produk;
    if (fileLama) {
      const pathFile = path.join(__dirname, '../public/images/', fileLama);
      fs.unlinkSync(pathFile);
    }
    connection.query('delete from produk where id_produk = ' + id, function (err, result) {
      if (err) {
        req.flash('error', 'Gagal Menghapus data');
      } else {
        req.flash('success', 'Data terhapus!');
      }
      res.redirect('/produk');
    });
  });
});

module.exports = router;
