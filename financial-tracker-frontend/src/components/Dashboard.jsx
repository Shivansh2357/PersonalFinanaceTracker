import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view the dashboard");
          setLoading(false);
          return;
        }

        const [transRes, invRes] = await Promise.all([
          axios.get("http://localhost:8000/api/transactions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/investments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTransactions(transRes.data);
        setInvestments(invRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalInvested = investments.reduce((sum, i) => sum + i.amountInvested, 0);

  // Chart data
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#34D399", "#EF4444"],
      },
    ],
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-2xl text-green-500">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p className="text-2xl text-red-500">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Invested</h3>
          <p className="text-2xl text-blue-500">${totalInvested.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((trans) => (
                  <tr key={trans._id} className="border-b">
                    <td className="p-2">{trans.category}</td>
                    <td className="p-2">{trans.type}</td>
                    <td className="p-2">${trans.amount.toFixed(2)}</td>
                    <td className="p-2">
                      {new Date(trans.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>

      {/* Investments */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Investments</h2>
        {investments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {investments.slice(0, 5).map((inv) => (
                  <tr key={inv._id} className="border-b">
                    <td className="p-2">{inv.name}</td>
                    <td className="p-2">{inv.type}</td>
                    <td className="p-2">${inv.amountInvested.toFixed(2)}</td>
                    <td className="p-2">{inv.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No investments found.</p>
        )}
      </div>

      {/* Placeholder Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Savings", "Loans", "Recurring Transactions", "Tax"].map((title) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p>{title} overview coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;