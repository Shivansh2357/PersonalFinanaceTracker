import express from "express";
import {
  createTax,
  getUserTaxes,
  getTaxById,
  updateTax,
  deleteTax
} from "../controllers/taxController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Ensure authentication

const router = express.Router();

// Routes for tax management
router.post("/add", protect, createTax);         // Create a tax record
router.get("/", protect, getUserTaxes);       // Get all tax records for the user
router.get("/:id", protect, getTaxById);      // Get a specific tax record by ID
router.put("/:id", protect, updateTax);       // Update a tax record
router.delete("/:id", protect, deleteTax);    // Delete a tax record

export default router;
