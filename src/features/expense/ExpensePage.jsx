import { useEffect, useState, useCallback } from "react";
import ExpenseForm from "../../components/forms/ExpenseForm"; // Import the form component
import ExpenseService from "./ExpenseService"; // Import the expense service

export default function ExpensePage() {
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(false);  // For loading state
  const [error, setError] = useState("");  // For error state

  // Fetch all expense entries
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError("");  // Reset error before fetching
    try {
      const data = await ExpenseService.getTotal();  // Use getTotal for fetching all expenses
      setExpenseList(data);
    } catch (err) {
      setError("Failed to fetch expenses. Please try again later.");
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async (expenseData) => {
    setLoading(true);
    setError("");  // Reset error before adding
    try {
      await ExpenseService.add(expenseData);
      fetchExpenses(); // Fetch updated expense list
    } catch (err) {
      setError("Failed to add expense. Please try again.");
      console.error("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");  // Reset error before deletion
    try {
      await ExpenseService.delete(id);
      fetchExpenses(); // Fetch updated expense list after deletion
    } catch (err) {
      setError("Failed to delete expense. Please try again.");
      console.error("Error deleting expense:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Expenses</h1>

      {/* Display error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ExpenseForm for adding new expenses */}
      <ExpenseForm onSubmit={handleAddExpense} />

      {/* Show loading indicator */}
      {loading && <p>Loading expenses...</p>}

      {/* List of expenses */}
      {!loading && expenseList.length === 0 ? (
        <p>No expenses available.</p>
      ) : (
        <ul className="space-y-2 mt-6">
          {expenseList.map((expense) => (
            <li key={expense.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="font-medium">₹{expense.amount} - {expense.category}</p>
                <p className="text-sm text-gray-500">{expense.note}</p>
              </div>
              <button
                onClick={() => handleDelete(expense.id)}
                className="text-red-500 hover:underline"
                disabled={loading} // Disable button while loading
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
