const express = require("express");

const {
  createProduct,
  getDashboardData,
} = require("../controllers/productController");

const router = express.Router();

router.post("/create", createProduct);
router.get("/dashboard", getDashboardData);

module.exports = router;