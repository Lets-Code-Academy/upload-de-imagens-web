const multer = require('multer')
const path = require('path')
const { v4: uuid } = require('uuid')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback ) => {
      const uniquename = uuid()
      return callback(null, uniquename + path.extname(file.originalname))
    }
  })

}