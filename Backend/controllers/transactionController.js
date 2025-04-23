import Transaction from "../model/Transaction.js";

// @desc   Add new transaction
// @route  POST /api/transactions
// @access Private
export const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      category,
      description,
      date,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all transactions for logged-in user
// @route  GET /api/transactions
// @access Private
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a transaction
// @route  DELETE /api/transactions/:id
// @access Private
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc   Get a single transaction by ID
// @route  GET /api/transactions/:id
// @access Private
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc   Update a transaction
// @route  PUT /api/transactions/:id
// @access Private
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { type, amount, category, description, date } = req.body;

    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
