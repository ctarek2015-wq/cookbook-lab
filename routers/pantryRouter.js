const express = require("express");
const router = express.Router({ mergeParams: true });
const pantryCtrl = require("../controllers/pantryCtrl");

// Routes

router.get("/", pantryCtrl.index);
router.get("/new", pantryCtrl.newFood);
router.post("/", pantryCtrl.create);
router.get("/:foodId", pantryCtrl.show);
router.get("/:foodId/edit", pantryCtrl.edit);
router.put("/:foodId", pantryCtrl.update);
router.delete("/:foodId/delete", pantryCtrl.deletePantry);

// Exports

module.exports = router;
