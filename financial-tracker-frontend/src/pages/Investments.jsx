import { useState, useEffect } from "react";
import axios from "axios";
import InvestmentList from "../components/InvestmentList";

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in");
        setLoading(false);
        return;
      }
      const res = await axios.get("http://localhost:8000/api/investments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestments(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching investments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Investments</h1>
      <InvestmentList
        investments={investments}
        fetchInvestments={fetchInvestments}
      />
    </div>
  );
};

export default Investments;