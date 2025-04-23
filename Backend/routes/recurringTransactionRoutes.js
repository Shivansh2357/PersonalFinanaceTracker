import express from "express";
import { addRecurringTransaction, getRecurringTransactions, updateRecurringTransaction, deleteRecurringTransaction } from "../controllers/recurringTransactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addRecurringTransaction);
router.get("/", protect, getRecurringTransactions);
router.put("/:id", protect, updateRecurringTransaction);
router.delete("/:id", protect, deleteRecurringTransaction);

export default router;
