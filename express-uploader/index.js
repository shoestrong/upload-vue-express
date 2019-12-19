const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(cors())

const fileFilter = (req, file, cb) => {
  const allowedtypes = ['image/jpeg', 'image/jpg', 'image/png']
  console.log(file)
  if (!allowedtypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file')
    error.code = 'INCORRECT_FILETYPE'
    return cb(error, false)
  }
  cb(null, true)
}

const upload = multer({
  dest: './uploads',
  fileFilter,
  limits: {
    fileSize: 20000000
  }
})

const PORT = '5000' || process.env.PORT

app.use('/upload', upload.single('file'), (req, res) => {
  res.json({
    file: req.file
  })
})

app.use((err, req, res, next) => {
  if (err.code === 'INCORRECT_FILETYPE') {
    res.status(422).json({
      error: 'Only images arr allowed'
    })
    return
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(422),json({
      error: 'Allow file size is 2mb'
    })
    return
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
