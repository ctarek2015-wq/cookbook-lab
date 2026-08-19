const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

// Routes

router.get("/users", usersCtrl.index);
router.get("/users/:id", usersCtrl.show);

// Exports

module.exports = router;
