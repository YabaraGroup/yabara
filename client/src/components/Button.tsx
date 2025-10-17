interface ButtonTypeProps {
  text: string;
  variant?: 'primary' | 'secondary';
  onClick?: (e: React.FormEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function ButtonType({
  text,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonTypeProps) {
  const baseClasses =
    'px-4 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50';
  const variantClasses =
    variant === 'primary'
      ? 'bg-[#2f2f2f] text-white hover:bg-black w-full'
      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
