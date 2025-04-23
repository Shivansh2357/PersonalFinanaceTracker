import express from "express";
import { addInvestment, getInvestments, updateInvestment, deleteInvestment } from "../controllers/investmentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addInvestment);
router.get("/", protect, getInvestments);
router.put("/:id", protect, updateInvestment);
router.delete("/:id", protect, deleteInvestment);

export default router;
