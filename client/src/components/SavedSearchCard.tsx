import { FiMapPin } from 'react-icons/fi';
import { SlNote } from 'react-icons/sl';

interface SavedSearchCardProps {
  title: string;
  location: string;
  contract: string;
  talents: number;
  trend: string;
}

export default function SavedSearchCard({
  title,
  location,
  contract,
  talents,
  trend,
}: SavedSearchCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{title}</h3>
          <div className="flex items-center gap-3 text-gray-500 text-sm mt-1">
            <span>
              <FiMapPin className="inline mr-1" /> {location}
            </span>
            <span>
              <SlNote className="inline mr-1" /> {contract}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold">{talents} talents</p>
        <span className="bg-green-50 text-green-700 text-sm font-medium px-2 py-1 rounded-md">
          {trend}
        </span>
      </div>
    </div>
  );
}
