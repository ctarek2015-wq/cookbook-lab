const express = require("express");
const router = express.Router();
const pagesCtrl = require("../controllers/pagesCtrl");

// Public Routes

router.get("/", pagesCtrl.home);

// Exports

module.exports = router;
