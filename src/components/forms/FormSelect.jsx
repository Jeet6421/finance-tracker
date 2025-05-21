export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  required = true,
  disabled = false,
  placeholder = "Select an option",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt, idx) =>
          typeof opt === "object" ? (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ) : (
            <option key={idx} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    </div>
  );
}
