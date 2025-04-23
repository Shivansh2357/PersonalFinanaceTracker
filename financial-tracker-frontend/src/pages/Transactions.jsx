import { useState, useEffect } from "react";
import axios from "axios";
import TransactionList from "../components/TransactionList";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in");
        setLoading(false);
        return;
      }
      const res = await axios.get("http://localhost:8000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching transactions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <TransactionList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default Transactions;