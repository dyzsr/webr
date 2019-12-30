const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const moment = require('moment')

const app = express()
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        moment.now()
        cb(null, `${moment().format('YYYY-MM-DDThh:mm:ss')}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    return res.status(200).send(req.file)
})

app.get('/files', (req, res) => {
    fs.readdir('uploads/', (err, items) => {
        console.log(items);
        res.send(items);
    })
})

app.get('/files/:filename', (req, res) => {
    const filename = req.param('filename')
    return res.sendFile(`${__dirname}/uploads/${filename}`)
})

app.listen(8888, () => {
    console.log('App running on port 8888');
})