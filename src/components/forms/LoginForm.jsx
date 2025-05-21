import { useState } from "react";
import FormInput from "./FormInput";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-full max-w-sm mx-auto space-y-4"
    >
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
      >
        Login
      </button>
    </form>
  );
}
