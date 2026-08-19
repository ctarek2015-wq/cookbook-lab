const express = require("express");
const router = express.Router();
const ingrCtrl = require("../controllers/ingrCtrl");

// Routes

router.get("/", ingrCtrl.index);
router.get("/new", ingrCtrl.newIngredient);
router.post("/", ingrCtrl.create);
router.get("/:ingrId", ingrCtrl.show);
router.get("/:ingrId/edit", ingrCtrl.edit);
router.put("/:ingrId", ingrCtrl.update);
router.delete("/:ingrId/delete", ingrCtrl.deleteIngredient);

// Exports

module.exports = router;
