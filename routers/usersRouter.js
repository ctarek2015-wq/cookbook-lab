const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

// Routes

router.get("/", usersCtrl.index);
router.get("/:id", usersCtrl.show);

// Exports

module.exports = router;
