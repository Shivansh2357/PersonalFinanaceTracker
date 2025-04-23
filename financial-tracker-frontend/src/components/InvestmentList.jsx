import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const InvestmentList = ({ investments, fetchInvestments }) => {
  const [formData, setFormData] = useState({
    type: "stock",
    name: "",
    symbol: "",
    amountInvested: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
    description: "",
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
          `http://localhost:8000/api/investments/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Investment updated");
      } else {
        await axios.post("http://localhost:8000/api/investments/add", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Investment added");
      }
      setFormData({
        type: "stock",
        name: "",
        symbol: "",
        amountInvested: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
        description: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchInvestments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving investment");
    }
  };

  const handleEdit = (inv) => {
    setFormData({
      type: inv.type,
      name: inv.name,
      symbol: inv.symbol || "",
      amountInvested: inv.amountInvested,
      quantity: inv.quantity,
      purchasePrice: inv.purchasePrice,
      purchaseDate: inv.purchaseDate.split("T")[0],
      description: inv.description || "",
    });
    setEditingId(inv._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/investments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Investment deleted");
      fetchInvestments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting investment");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-primary text-white p-2 rounded hover:bg-secondary"
      >
        {showForm ? "Cancel" : editingId ? "Edit Investment" : "Add Investment"}
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
                <option value="stock">Stock</option>
                <option value="crypto">Crypto</option>
                <option value="real_estate">Real Estate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Amount Invested</label>
              <input
                type="number"
                name="amountInvested"
                value={formData.amountInvested}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                required
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
            {editingId ? "Update Investment" : "Add Investment"}
          </button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv) => (
              <tr key={inv._id} className="border-b">
                <td className="p-2">{inv.name}</td>
                <td className="p-2">{inv.type}</td>
                <td className="p-2">${inv.amountInvested.toFixed(2)}</td>
                <td className="p-2">{inv.quantity}</td>
                <td className="p-2">{inv.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(inv)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(inv._id)}
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

export default InvestmentList;