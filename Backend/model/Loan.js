import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["home", "personal", "car", "education"], 
        required: true 
    },
    lender: { type: String,
        required: true 
    }, // Bank or lender name
    loanAmount: { 
        type: Number, 
        required: true 
    }, // Principal amount
    interestRate: { 
        type: Number, 
        required: true 
    }, // Interest rate (Annual)
    tenure: { 
        type: Number, 
        required: true 
    }, // Loan tenure in months
    startDate: { 
        type: Date, 
        required: true 
    }, // Loan start date
    monthlyEMI: { 
        type: Number, 
        required: true 
    }, // Calculated EMI amount
    remainingBalance: { 
        type: Number, 
        required: true 
    }, // Balance left to be paid
    status: { type: String, 
        enum: ["active", "closed"],
        default: "active" 
    }, // Active or Closed
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
