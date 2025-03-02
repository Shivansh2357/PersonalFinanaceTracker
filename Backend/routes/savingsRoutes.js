import express from "express";
import { addSavings, getSavings, updateSavings, deleteSavings } from "../controllers/savingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addSavings);
router.get("/", protect, getSavings);
router.put("/:id", protect, updateSavings);
router.delete("/:id", protect, deleteSavings);

export default router;
