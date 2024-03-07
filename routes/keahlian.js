const express = require('express');
const router = express.Router();
const Model_Keahlian = require('../model/model-keahlian');
const Model_Mahasiswa = require('../model/model-mahasiswa');

router.get('/', async function (req, res, next) {
  try {
    const keahlians = await Model_Keahlian.getAll();
    res.render('keahlian/index', { data: keahlians });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/create', async function (req, res, next) {
  try {
    let data = await Model_Mahasiswa.getAll();
    res.render('keahlian/create', {
      nama_keahlian: '',
      tingkat_keahlian: '',
      id_mahasiswa: '',
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/store', async function (req, res, next) {
  try {
    let data = {
      nama_keahlian: req.body.nama_keahlian,
      tingkat_keahlian: req.body.tingkat_keahlian,
      id_mahasiswa: req.body.id_mahasiswa,
    };
    await Model_Keahlian.Store(data);
    req.flash('success', 'Keahlian berhasil dibuat');
    res.redirect('/keahlian');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Gagal membuat Keahlian');
    res.redirect('/keahlian');
  }
});

router.get('/edit/:id', async function (req, res, next) {
  try {
    // Ambil data mahasiswa untuk ditampilkan di dropdown
    let dataMahasiswa = await Model_Mahasiswa.getAll();

    // Ambil ID dari parameter URL
    const id = req.params.id;

    // Ambil data keahlian berdasarkan ID yang diberikan
    const keahlian = await Model_Keahlian.getId(id);

    // Periksa apakah data keahlian ditemukan
    if (!keahlian) {
      // Jika tidak ditemukan, kembalikan respon dengan pesan error
      return res.status(404).send('Data keahlian tidak ditemukan');
    }

    // Render tampilan edit dengan data keahlian dan data mahasiswa
    res.render('keahlian/edit', {
      id: id,
      nama_keahlian: keahlian.nama_keahlian,
      tingkat_keahlian: keahlian.tingkat_keahlian,
      id_mahasiswa: keahlian.id_mahasiswa,
      data: dataMahasiswa, // Mengirimkan data mahasiswa ke dalam tampilan edit
    });
  } catch (error) {
    // Tangani error jika terjadi
    console.error(error);
    next(error); // Lanjutkan ke middleware error handling
  }
});

router.post('/update/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    let data = {
      nama_keahlian: req.body.nama_keahlian,
      tingkat_keahlian: req.body.tingkat_keahlian,
      id_mahasiswa: req.body.id_mahasiswa,
    };
    await Model_Keahlian.Update(id, data);
    req.flash('success', 'Keahlian updated successfully');
    res.redirect('/keahlian');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to update Keahlian');
    res.redirect('/keahlian');
  }
});

router.get('/delete/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    await Model_Keahlian.Delete(id);
    req.flash('success', 'Keahlian deleted successfully');
    res.redirect('/keahlian');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to delete Keahlian');
    res.redirect('/keahlian');
  }
});

module.exports = router;
