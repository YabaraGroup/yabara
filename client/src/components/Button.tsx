interface ButtonTypeProps {
  text: string;
  variant?: 'primary' | 'secondary'; // primary = noir, secondary = blanc
  onClick?: () => void;
}

export default function ButtonType({ text, variant = 'secondary', onClick }: ButtonTypeProps) {
  const base = 'px-6 py-2 rounded-md font-medium text-sm transition-colors duration-200';

  const styles =
    variant === 'primary'
      ? 'bg-[#2f2f2f] text-white hover:bg-black w-full'
      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100';

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {text}
    </button>
  );
}
