const multer = require('multer')

module.exports.storageConfig = multer.diskStorage({
    destination: (req,file,cb) =>  {
        console.log('Parametrs of request ' + file)
        if(file.originalname.toLowerCase().endsWith('.docx') 
            || file.originalname.toLowerCase().endsWith('.pdf')
            || file.originalname.toLowerCase().endsWith('.pptx')) {
            cb(null, "./files")            
        } else {
            cb(null, "../front/src/assets/uploads")
        }
    },
    filename: (req,file,cb) => {
        let verifiedFileName = Date.now() + file.originalname.toLowerCase()
        cb(null, verifiedFileName)
    }
})