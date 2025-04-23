import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    type: { 
        type: String,
        enum: ["stock", "crypto", "real_estate"],
        required: true 
    },
    name: { 
        type: String,
        required: true 
    }, 
    symbol: { 
        type: String 
    }, 
    amountInvested: { 
        type: Number, 
        required: true 
    }, // Amount of money invested
    quantity: { 
        type: Number, 
        required: true 
    }, // Number of shares
    purchasePrice: { 
        type: Number, 
        required: true 
    }, // Price per unit at purchase
    currentPrice: { 
        type: Number 
    }, // Latest market price
    purchaseDate: { 
        type: Date, 
        required: true 
    }, // Date of investment
    description: { 
        type: String 
    },
    status: { 
        type: String,
        enum: ["active", "sold"], 
        default: "active" 
    }, // Active or Sold
  },
  { timestamps: true }
);

const Investment = mongoose.model("Investment", investmentSchema);
export default Investment;
