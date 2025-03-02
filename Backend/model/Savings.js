import mongoose from "mongoose";

const savingsSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },

    goal: { 
        type: String, 
        required: true 
    }, // Example: "Car", "Vacation"


    targetAmount: { 
        type: Number,
        required: true 
    }, // Savings goal

    currentAmount: { 
        type: Number,
        default: 0 
    }, // Money saved so far

    description: { 
        type: String 
    },

    dateCreated: { 
        type: Date,
         default: Date.now 
    },
  },
  { timestamps: true }
);

const Savings = mongoose.model("Savings", savingsSchema);
export default Savings;
