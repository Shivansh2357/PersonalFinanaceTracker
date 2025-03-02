import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import savingsRoutes from "./routes/savingsRoutes.js";
import recurringTransactionRoutes from "./routes/recurringTransactionRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/recurring-transactions", recurringTransactionRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/loans", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
