import express from "express";
import { addTransaction, getTransactions, deleteTransaction, getTransactionById, updateTransaction } from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.get("/:id",protect,getTransactionById);
router.put("/:id",protect,updateTransaction);


export default router;
