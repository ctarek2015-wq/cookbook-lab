const express = require("express");
const router = express.Router();
const recipeCtrl = require("../controllers/recipeCtrl");

// Routes

router.get("/", recipeCtrl.index);
router.get("/new", recipeCtrl.newRecipe);
router.post("/", recipeCtrl.create);
router.get("/:recipeId", recipeCtrl.show);
router.get("/:recipeId/edit", recipeCtrl.edit);
router.put("/:recipeId", recipeCtrl.update);
router.delete("/:recipeId/delete", recipeCtrl.deleteRecipe);

// Exports

module.exports = router;
