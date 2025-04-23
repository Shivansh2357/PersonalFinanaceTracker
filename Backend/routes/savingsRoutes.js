import express from "express";
import { addSavings, getSavings, updateSavings, deleteSavings } from "../controllers/savingsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addSavings);
router.get("/", protect, getSavings);
router.put("/:id", protect, updateSavings);
router.delete("/:id", protect, deleteSavings);

export default router;
