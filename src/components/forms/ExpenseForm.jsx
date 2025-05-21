import { useState, useCallback } from "react";

export default function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    notes: "",
    date: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { amount, category, date } = form;
      if (amount && category && date) {
        onSubmit(form);
        setForm({ amount: "", category: "", notes: "", date: "" });
      } else {
        alert("Please fill in all required fields.");
      }
    },
    [form, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Expense Amount"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Expense Category"
          placeholder="Enter category"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes (optional)
        </label>
        <input
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Expense Notes"
          placeholder="Enter notes"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Expense Date"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
}
