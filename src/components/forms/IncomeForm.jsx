import { useState } from "react";

const initialFormState = {
  amount: "",
  source: "",
  date: "",
  description: "",
};

export default function InvestmentForm({ onSubmit }) {
  const [form, setForm] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, source, date } = form;
    if (!amount || !source || !date) return;

    onSubmit({
      ...form,
      amount: parseFloat(amount),
    });

    setForm(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      {/* Source Field */}
      <div>
        <label htmlFor="source" className="block text-sm font-medium mb-1">
          Source
        </label>
        <input
          id="source"
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Investment Source"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Amount Field */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount Invested"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <input
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Additional notes"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
      >
        Add Investment
      </button>
    </form>
  );
}
