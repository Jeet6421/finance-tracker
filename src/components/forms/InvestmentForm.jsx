import { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const initialState = {
  investmentType: "",
  amount: "",
  returns: "",
  date: "",
  description: "",
};

export default function InvestmentForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { investmentType, amount, returns, date } = form;

    if (!investmentType || !amount || !returns || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit({
      ...form,
      amount: parseFloat(amount),
      returns: parseFloat(returns),
    });

    setForm(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <FormSelect
        label="Investment Type"
        name="investmentType"
        value={form.investmentType}
        onChange={handleChange}
        options={["Stocks", "Mutual Funds", "Real Estate"]}
        required
      />

      <FormInput
        label="Amount"
        name="amount"
        type="number"
        step="0.01"
        min="0"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Returns"
        name="returns"
        type="number"
        step="0.01"
        min="0"
        value={form.returns}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Investment Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Description"
        name="description"
        type="text"
        value={form.description}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition"
      >
        Add Investment
      </button>
    </form>
  );
}
