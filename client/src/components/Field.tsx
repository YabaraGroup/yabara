import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type FieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'select' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
  options?: Option[];
  required?: boolean;
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
}: FieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">-- Choisir --</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            disabled={disabled}
            onChange={onChange}
            required={required}
            className="border rounded px-2 py-1 w-full pr-10" // espace pour l’icône
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-dark-gold"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
