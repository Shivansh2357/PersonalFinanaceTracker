import mongoose from "mongoose";

const recurringTransactionSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
     },
    title: {
        type: String,
        required: true 
    }, // Example: "Netflix Subscription"
    amount: { 
        type: Number,
        required: true 
    }, // Amount deducted/credited
    type: { 
        type: String, 
        enum: ["income", "expense"], 
        required: true 
    }, // "income" or "expense"
    category: { 
        type: String, 
        required: true 
    }, // Example: "Rent", "Subscription", "Loan EMI"
    frequency: { 
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"], 
        required: true 
    }, // Recurring interval
    nextDueDate: { 
        type: Date, 
        required: true 
    }, // Next transaction date
    description: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ["active", "inactive"], 
        default: "active" 
    }, // Active or Inactive transaction
    dateCreated: { 
        type: Date, 
        default: Date.now 
    },
  },
  { timestamps: true }
);

const RecurringTransaction = mongoose.model("RecurringTransaction", recurringTransactionSchema);
export default RecurringTransaction;
