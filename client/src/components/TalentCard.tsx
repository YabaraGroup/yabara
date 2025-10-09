import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

interface TalentCardProps {
  name: string;
  job: string;
  location: string;
  avatar: string;
}

export default function TalentCard({ name, job, location, avatar }: TalentCardProps) {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col items-center text-center relative">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-black bg-gray-100 p-3 rounded-full"
        onClick={handleChecked}
      >
        {checked ? <FaBookmark size={18} className="text-black" /> : <FaRegBookmark size={18} />}
      </button>
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover mb-3" />
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-500 text-sm">{job}</p>
      <p className="text-gray-400 text-sm">{location}</p>

      <button className="mt-4 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 transition">
        Voir le profil
      </button>
    </div>
  );
}
