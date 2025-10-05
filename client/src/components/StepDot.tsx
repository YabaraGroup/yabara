function StepDot({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${active ? 'bg-gold' : 'bg-gray-300'}`} />
      <span className={`text-sm ${active ? 'font-medium' : 'opacity-60'}`}>{label}</span>
    </div>
  );
}

export default StepDot;
