/*jshint esversion: 11 */
var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_kategori = require('../model/model-kategori');

router.get('/', async function (req, res, next) {
  let rows = await Model_kategori.getAll();
  res.render('kategori/index', {
    data: rows,
  });
});

router.get('/create', function (req, res, next) {
  res.render('kategori/create', {
    nama_kategori: '',
  });
});

router.post('/store', async function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let Data = {
      nama_kategori,
    };
    await Model_kategori.Store(Data);
    req.flash('success', 'Berhasil menyimpan data!');
    res.redirect('/kategori');
  } catch {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/kategori');
  }
});

router.get('/edit/(:id)', async function (req, res, next) {
  let id = req.params.id;
  let rows = await Model_kategori.getId(id);
  res.render('kategori/edit', {
    id: rows[0].id_kategori,
    nama_kategori: rows[0].nama_kategori,
  });
});

router.post('/update/(:id)', async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kategori } = req.body;
    let Data = {
      nama_kategori,
    };
    await Model_kategori.Update(id, Data);
    req.flash('successs', 'berhasil memperbarui data');
    res.redirect('/kategori');
  } catch {
    req.flash('error', 'terjadi kesalahan pada fungsi');
    res.render('/kategori');
  }
});

router.get('/delete/(:id)', async function (req, res) {
  let id = req.params.id;
  await Model_kategori.Delete(id);
  req.flash('success', 'data berhasil dihapus');
  res.redirect('/kategori');
});

module.exports = router;
