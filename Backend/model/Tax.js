import mongoose from "mongoose";

const TaxSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  taxYear: { 
    type: Number,
     required: true 
    },
  income: { 
    type: Number, 
    required: true 
},
  deductions: { 
    type: Number, 
    default: 0 
},
  taxableIncome: { 
    type: Number,
    required: true 
},
  taxPaid: { 
    type: Number, 
    required: true 
},
  liabilities: { 
    type: Number, 
    default: 0 
},
  createdAt: { 
    type: Date, 
    default: Date.now }
});

export default mongoose.model("Tax", TaxSchema);
