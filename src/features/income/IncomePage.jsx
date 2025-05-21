import { useEffect, useState, useCallback } from "react";
import IncomeForm from "../../components/forms/IncomeForm";
import IncomeService from "./IncomeService";

export default function IncomePage() {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchIncome = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await IncomeService.getAll();
      setIncomeList(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch income entries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  const handleAddIncome = async (incomeData) => {
    setActionLoading(true);
    setError("");

    try {
      await IncomeService.create(incomeData);
      await fetchIncome(); // Refresh list
    } catch (err) {
      console.error("Add error:", err);
      setError("Failed to add income.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    setError("");

    try {
      await IncomeService.delete(id);
      setIncomeList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete income.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Income</h1>

      <IncomeForm onSubmit={handleAddIncome} loading={actionLoading} />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {loading ? (
        <p className="mt-4">Loading income entries...</p>
      ) : incomeList.length === 0 ? (
        <p className="mt-4 text-gray-600">No income entries available.</p>
      ) : (
        <ul className="space-y-2 mt-6">
          {incomeList.map((income) => (
            <li
              key={income.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div>
                <p className="font-medium">
                  ₹{income.amount} - {income.source}
                </p>
                {income.note && (
                  <p className="text-sm text-gray-500">{income.note}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(income.id)}
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
