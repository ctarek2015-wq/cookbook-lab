const express = require("express");
const router = express.Router();
const isSignedIn = require("../middlewares/isSignedIn");
const authCtrl = require("../controllers/authCtrl");

// Public Routes

router.get("/sign-up", authCtrl.signUp);
router.post("/sign-up", authCtrl.register);
router.get("/sign-in", authCtrl.signIn);
router.post("/sign-in", authCtrl.login);

// Private Routes

router.get("/sign-out", isSignedIn, authCtrl.signOut);

// Exports

module.exports = router;
