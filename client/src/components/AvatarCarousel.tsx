import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AvatarCarousel({
  avatars,
  handleSelectAvatar,
}: {
  avatars: string[];
  handleSelectAvatar: (url: string) => void;
}) {
  const [current, setCurrent] = useState(1); // index central

  const prev = () => {
    setCurrent(prev => (prev === 0 ? avatars.length - 1 : prev - 1));
    handleSelectAvatar(avatars[current === 0 ? avatars.length - 1 : current - 1]);
  };

  const next = () => {
    const nextIndex = current === avatars.length - 1 ? 0 : current + 1;
    setCurrent(nextIndex);
    handleSelectAvatar(avatars[nextIndex]);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Flèche gauche */}
      <button
        onClick={prev}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        type="button"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Avatars */}
      <div className="flex items-center justify-center">
        {avatars.map((src, index) => {
          const isActive = index === current;
          const isSide =
            index === (current + 1) % avatars.length ||
            index === (current - 1 + avatars.length) % avatars.length;

          if (!isActive && !isSide) return null; // on n’affiche que 3 à la fois

          return (
            <img
              key={index}
              src={src}
              alt={`avatar-${index}`}
              className={`rounded-full border-4 border-white shadow-md transition-all duration-300
                ${isActive ? 'w-24 h-24 z-20 -mx-4' : 'w-16 h-16 z-10 -mx-4 opacity-80'}
              `}
            />
          );
        })}
      </div>

      {/* Flèche droite */}
      <button
        onClick={next}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        type="button"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
