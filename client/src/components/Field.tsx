import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type FieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'select' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  options?: Option[];
  required?: boolean;
  rows?: number; // facultatif pour textarea
};

export default function Field({
  label,
  name,
  type = 'text',
  value,
  disabled = false,
  onChange,
  options = [],
  required = false,
  rows = 4,
}: FieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* --- SELECT --- */}
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none pr-10 bg-[#F4F4F4]"
        >
          <option value="">-- Choisir --</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : /* --- TEXTAREA --- */
      type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={rows}
          placeholder={label}
          className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none bg-[#F4F4F4] resize-none"
        />
      ) : (
        /* --- INPUT --- */
        <div className="relative">
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            placeholder={label}
            disabled={disabled}
            onChange={onChange}
            required={required}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none pr-10 bg-[#F4F4F4]"
          />

          {/* --- Password toggle --- */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5481AA] hover:text-black focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
