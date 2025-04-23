import Tax from "../model/Tax.js";

// Create a new tax record
export const createTax = async (req, res) => {
  try {
    const { taxYear, income, deductions, taxableIncome, taxPaid, liabilities } = req.body;

    const newTax = new Tax({
      user: req.user.id, // Assuming user is authenticated
      taxYear,
      income,
      deductions,
      taxableIncome,
      taxPaid,
      liabilities
    });

    await newTax.save();
    res.status(201).json({ message: "Tax record created successfully", tax: newTax });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tax records for the logged-in user
export const getUserTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find({ user: req.user.id }).sort({ taxYear: -1 });
    res.status(200).json(taxes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single tax record by ID
export const getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);

    if (!tax) {
      return res.status(404).json({ message: "Tax record not found" });
    }

    res.status(200).json(tax);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tax record
export const updateTax = async (req, res) => {
  try {
    const updatedTax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTax) {
      return res.status(404).json({ message: "Tax record not found" });
    }

    res.status(200).json({ message: "Tax record updated", tax: updatedTax });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a tax record
export const deleteTax = async (req, res) => {
  try {
    const deletedTax = await Tax.findByIdAndDelete(req.params.id);

    if (!deletedTax) {
      return res.status(404).json({ message: "Tax record not found" });
    }

    res.status(200).json({ message: "Tax record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
