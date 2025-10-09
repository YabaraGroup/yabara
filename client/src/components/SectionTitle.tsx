interface SectionTitleProps {
  title: string;
  actionText?: string;
}

export default function SectionTitle({ title, actionText }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      {actionText && (
        <a href="#" className="text-sm text-gray-500 hover:underline">
          {actionText}
        </a>
      )}
    </div>
  );
}
