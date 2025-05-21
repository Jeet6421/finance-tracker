import { useEffect, useRef, useState } from "react";
import InvestmentService from "./InvestmentService";

export default function InvestmentPage() {
  const [investments, setInvestments] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "",
    returns: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const didFetch = useRef(false);

  const fetchInvestments = async () => {
    try {
      const data = await InvestmentService.getTotal();
      setInvestments(data);
    } catch (err) {
      setError(err.message || "Failed to fetch investments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!didFetch.current) {
      fetchInvestments();
      didFetch.current = true;
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      amount: "",
      type: "",
      returns: "",
      date: "",
      description: "",
    });
  };

  const validateForm = () => {
    const { amount, type, returns, date } = form;
    if (!amount || !type || !returns || !date) {
      return "Amount, Type, Returns, and Investment Date are required.";
    }
    return null;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      const newInvestment = await InvestmentService.add(form);
      setInvestments((prev) => [...prev, newInvestment]);
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to add investment.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    setError("");

    try {
      await InvestmentService.delete(id);
      setInvestments((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete investment.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Investments</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Investment Form */}
      <form onSubmit={handleAdd} className="mb-6 space-y-2">
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (e.g., Stocks, FD)"
          className="w-full p-2 border rounded"
        />
        <input
          name="returns"
          type="number"
          value={form.returns}
          onChange={handleChange}
          placeholder="Returns (%)"
          className="w-full p-2 border rounded"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
          disabled={actionLoading}
        >
          {actionLoading ? "Adding..." : "Add Investment"}
        </button>
      </form>

      {/* Investment List */}
      {loading ? (
        <p>Loading investments...</p>
      ) : investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <ul className="space-y-2">
          {investments.map((inv) => (
            <li
              key={inv.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div>
                <p className="font-medium">
                  ₹{inv.amount} - {inv.type}
                </p>
                <p className="text-sm text-gray-500">
                  Returns: {inv.returns}%
                </p>
                <p className="text-sm text-gray-500">
                  Date: {inv.investmentDate}
                </p>
                {inv.description && (
                  <p className="text-sm text-gray-500">{inv.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(inv.id)}
                className="text-red-500 hover:underline"
                disabled={actionLoading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
