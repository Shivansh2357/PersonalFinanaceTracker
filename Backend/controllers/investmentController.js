import Investment from "../model/Investment.js";

// @desc   Add a new investment
// @route  POST /api/investments
// @access Private
export const addInvestment = async (req, res) => {
  try {
    const { type, name, symbol, amountInvested, quantity, purchasePrice, purchaseDate, description } = req.body;

    const investment = new Investment({
      user: req.user.id,
      type,
      name,
      symbol,
      amountInvested,
      quantity,
      purchasePrice,
      purchaseDate,
      description,
    });

    const savedInvestment = await investment.save();
    res.status(201).json(savedInvestment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all investments for logged-in user
// @route  GET /api/investments
// @access Private
export const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user.id }).sort({ purchaseDate: -1 });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update an investment (Update price, status, etc.)
// @route  PUT /api/investments/:id
// @access Private
export const updateInvestment = async (req, res) => {
  try {
    const { amountInvested, quantity, currentPrice, status, description } = req.body;

    const investment = await Investment.findById(req.params.id);
    
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    if (investment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    investment.amountInvested = amountInvested || investment.amountInvested;
    investment.quantity = quantity || investment.quantity;
    investment.currentPrice = currentPrice || investment.currentPrice;
    investment.status = status || investment.status;
    investment.description = description || investment.description;

    const updatedInvestment = await investment.save();
    res.json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete an investment
// @route  DELETE /api/investments/:id
// @access Private
export const deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    if (investment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await investment.deleteOne();
    res.json({ message: "Investment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
