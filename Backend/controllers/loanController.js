import Loan from "../model/Loan.js";

// @desc   Add a new loan
// @route  POST /api/loans
// @access Private
export const addLoan = async (req, res) => {
  try {
    const { type, lender, loanAmount, interestRate, tenure, startDate } = req.body;

    // Calculate Monthly EMI using formula: EMI = (P * R * (1 + R)^N) / ((1 + R)^N - 1)
    const P = loanAmount; // Principal
    const R = interestRate / 100 / 12; // Monthly Interest Rate
    const N = tenure; // Number of months

    const EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = EMI * N; // Total amount to be paid
    const remainingBalance = totalPayment; // Initially, balance is total payment

    const loan = new Loan({
      user: req.user.id,
      type,
      lender,
      loanAmount,
      interestRate,
      tenure,
      startDate,
      monthlyEMI: EMI.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
    });

    const savedLoan = await loan.save();
    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all loans for logged-in user
// @route  GET /api/loans
// @access Private
export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({ startDate: -1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update loan details (remaining balance, status)
// @route  PUT /api/loans/:id
// @access Private
export const updateLoan = async (req, res) => {
  try {
    const { remainingBalance, status } = req.body;

    const loan = await Loan.findById(req.params.id);
    
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    loan.remainingBalance = remainingBalance || loan.remainingBalance;
    loan.status = status || loan.status;

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a loan
// @route  DELETE /api/loans/:id
// @access Private
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await loan.deleteOne();
    res.json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
