const express = require("express");
const router = express.Router();
const ownerModel = require("../module/owner-model");



router.post("/create", function (req, res) {
  res.send("hey it's working");
}); 



router.get("/", function (req, res) {
  res.send("hey it's working");
});


module.exports = router;
