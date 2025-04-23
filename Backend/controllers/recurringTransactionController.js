import RecurringTransaction from "../model/RecurringTransaction.js";

// @desc   Add a new recurring transaction
// @route  POST /api/recurring-transactions
// @access Private
export const addRecurringTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, frequency, nextDueDate, description } = req.body;
    
    const transaction = new RecurringTransaction({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      frequency,
      nextDueDate,
      description,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all recurring transactions for logged-in user
// @route  GET /api/recurring-transactions
// @access Private
export const getRecurringTransactions = async (req, res) => {
  try {
    const transactions = await RecurringTransaction.find({ user: req.user.id }).sort({ nextDueDate: 1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update a recurring transaction (Change frequency, amount, etc.)
// @route  PUT /api/recurring-transactions/:id
// @access Private
export const updateRecurringTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, frequency, nextDueDate, description, status } = req.body;

    const transaction = await RecurringTransaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: "Recurring transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.frequency = frequency || transaction.frequency;
    transaction.nextDueDate = nextDueDate || transaction.nextDueDate;
    transaction.description = description || transaction.description;
    transaction.status = status || transaction.status;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a recurring transaction
// @route  DELETE /api/recurring-transactions/:id
// @access Private
export const deleteRecurringTransaction = async (req, res) => {
  try {
    const transaction = await RecurringTransaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Recurring transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Recurring transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
