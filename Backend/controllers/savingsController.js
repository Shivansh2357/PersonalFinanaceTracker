import Savings from "../models/Savings.js";

// @desc   Add a new savings goal
// @route  POST /api/savings
// @access Private
export const addSavings = async (req, res) => {
  try {
    const { goal, targetAmount, description } = req.body;
    const savings = new Savings({
      user: req.user.id,
      goal,
      targetAmount,
      description,
    });

    const savedGoal = await savings.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all savings for logged-in user
// @route  GET /api/savings
// @access Private
export const getSavings = async (req, res) => {
  try {
    const savings = await Savings.find({ user: req.user.id }).sort({ dateCreated: -1 });
    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update savings amount (deposit or withdraw)
// @route  PUT /api/savings/:id
// @access Private
export const updateSavings = async (req, res) => {
  try {
    const { amount } = req.body;
    const savings = await Savings.findById(req.params.id);

    if (!savings) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    if (savings.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    savings.currentAmount += amount;
    await savings.save();
    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a savings goal
// @route  DELETE /api/savings/:id
// @access Private
export const deleteSavings = async (req, res) => {
  try {
    const savings = await Savings.findById(req.params.id);

    if (!savings) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    if (savings.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await savings.deleteOne();
    res.json({ message: "Savings goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
