export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true,
  placeholder = "",
  autoComplete = "off",
  disabled = false,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder || label}
        autoComplete={autoComplete}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        aria-label={label || name}
      />
    </div>
  );
}
