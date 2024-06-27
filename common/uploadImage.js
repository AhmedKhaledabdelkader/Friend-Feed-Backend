

const multer  = require('multer')

const { v4: uuidv4 } = require('uuid');

module.exports.uploadImage=(fieldName)=>{


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null,uuidv4() + "-" + file.originalname)
        }
      })
    
    //uuidv4()+Date.now()+ "-"+ Math.random()*10+ "-" + file.originalname
    
      function fileFilter (req, file, cb) {
    
        if(file.mimetype.startsWith("image")){
        cb(null, true)
      
        }
    
        else{
          
          cb(null, false)
    
          

        }
      
      }
    
    
    
    
    const upload = multer({  storage,fileFilter })
    
    return upload.single(fieldName)





}