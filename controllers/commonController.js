var sitPort = process.env.PORT || 8000;
var multer = require('multer'); //  middleware for handling multipart/form-data,

var fileUpload = (name,directoryPath)=>{
    try {
        // Configuring appropriate storage
        var storage = multer.diskStorage({
            // Absolute path
            destination: function (req, file, callback) {
                callback(null, './uploads/'+name);
            },
            // Match the field name in the request body
            filename: function (req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });
        return storage;
    } catch (e) {
        return throw new Error(e);
    }
}

const SITE_URL= "http://localhost:"+sitPort;




module.exports = {
    SITE_URL
}
