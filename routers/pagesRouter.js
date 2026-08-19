const express = require("express");
const router = express.Router({ mergeParams: true });
const pagesCtrl = require("../controllers/pagesCtrl");

// Public Routes

router.get("/", pagesCtrl.home);

// Exports

module.exports = router;
