import { useState } from "react";
import FormInput from "./FormInput";

const formInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState(formInitialState);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-full max-w-sm mx-auto space-y-4"
    >
      <FormInput
        label="First Name"
        name="firstName"
        type="text"
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Last Name"
        name="lastName"
        type="text"
        value={form.lastName}
        onChange={handleChange}
        required
      />
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
      >
        Register
      </button>
    </form>
  );
}
