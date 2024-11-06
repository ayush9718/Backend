const express = require("express");
const router= express.Router();

const {localFileUpload,ImageFileUpload,VideoFileUpload}= require("../controllers/fileUpload");

router.post("/localFileUpload",localFileUpload);
router.post("/ImageFileUpload",ImageFileUpload);
router.post("/VideoFileUpload",VideoFileUpload);

module.exports = router;
