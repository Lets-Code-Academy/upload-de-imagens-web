const express = require('express')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const multerConfig = require('./config/upload.js')

const app = express()

const upload = multer(multerConfig);

app.use(express.json())
app.use(cors())

app.use('/files', express.static(path.resolve(
  __dirname, '..', 'uploads'
)))

app.post('/upload', upload.single('file'), (request, response) => {
  const file = request.file

  const { path, filename} = file

  const fileData = {
    path,
    filename,
    url: `http://localhost:3333/files/${filename}`
  }
  return response.status(200).json(fileData)
})

app.listen(3333, () => console.log("Server started on http://localhost:3333"))