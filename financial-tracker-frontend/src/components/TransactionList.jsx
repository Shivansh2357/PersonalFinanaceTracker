import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TransactionList = ({ transactions, fetchTransactions }) => {
  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/transactions/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Transaction updated");
      } else {
        await axios.post("http://localhost:8000/api/transactions/add", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Transaction added");
      }
      setFormData({
        type: "income",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving transaction");
    }
  };

  const handleEdit = (trans) => {
    setFormData({
      type: trans.type,
      amount: trans.amount,
      category: trans.category,
      description: trans.description || "",
      date: trans.date.split("T")[0],
    });
    setEditingId(trans._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Transaction deleted");
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting transaction");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-primary text-white p-2 rounded hover:bg-secondary"
      >
        {showForm ? "Cancel" : editingId ? "Edit Transaction" : "Add Transaction"}
      </button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white p-2 rounded hover:bg-secondary"
          >
            {editingId ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trans) => (
              <tr key={trans._id} className="border-b">
                <td className="p-2">{trans.category}</td>
                <td className="p-2">{trans.type}</td>
                <td className="p-2">${trans.amount.toFixed(2)}</td>
                <td className="p-2">
                  {new Date(trans.date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(trans)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trans._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;