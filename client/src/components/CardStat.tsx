import { HiDotsVertical } from 'react-icons/hi';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { LuEqualApproximately } from 'react-icons/lu';

interface CardStatProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
}

export default function CardStat({ title, value, trend, trendType = 'neutral' }: CardStatProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <p className="font-bold">{title}</p>
        <button className="text-gray-400 hover:text-gray-600">
          <HiDotsVertical />
        </button>
      </div>
      <div className="text-3xl font-semibold mt-3">
        <span className="mr-1">{value}</span>
        {trendType === 'up' && (
          <FaArrowTrendUp className="inline text-[#00695C] ml-2 bg-[#E0F2F1] p-1 m-1 rounded" />
        )}
        {trendType === 'down' && (
          <FaArrowTrendDown className="inline text-[#C62828] ml-2 bg-[#FEE2E2] p-1 m-1 rounded" />
        )}
        {trendType === 'neutral' && (
          <LuEqualApproximately className="inline text-[#283593] ml-2 bg-[#E8EAF6E5] p-1 m-1 rounded" />
        )}
      </div>
      <p className={`text-sm mt-1`}>{trend}</p>
    </div>
  );
}
