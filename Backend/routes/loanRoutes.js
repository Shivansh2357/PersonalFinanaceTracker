import express from "express";
import { addLoan, getLoans, updateLoan, deleteLoan } from "../controllers/loanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addLoan);
router.get("/", protect, getLoans);
router.put("/:id", protect, updateLoan);
router.delete("/:id", protect, deleteLoan);

export default router;
