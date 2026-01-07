const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());

// GANTI DENGAN WEBHOOK KAMU
const WEBHOOK_URL = "https://discord.com/api/webhooks/1458594748003520524/e78Ix3mW_a_ANQFx-SV14p3hE38aSpnIeWGYwfTKoB9jThUfEp400h3W2zVChiTBobxM";

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const form = new FormData();
        form.append('file', req.file.buffer, {
            filename: 'surat-kontrak.png'
        });

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: form
        });

        if (response.ok) {
            res.send('✅ Upload ke Discord berhasil');
        } else {
            res.status(500).send('❌ Gagal upload ke Discord');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('❌ Error server');
    }
});

app.listen(3000, () => {
    console.log('🚀 Server jalan di http://localhost:3000');
});
