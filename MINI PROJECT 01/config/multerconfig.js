const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

//this is used for giving random names to the file
// crypto.randomBytes(12, function(err,bytes){
//     console.log(bytes.toString("hex"));
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploads"); // Avoid leading slash for relative path
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, bytes) {
      if (err) return cb(err);

      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
