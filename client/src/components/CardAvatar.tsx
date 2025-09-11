import Avatar from './Avatar';

function CardAvatar() {
  return (
    <div className="flex items-center space-x-4 flex-col sm:flex-row">
      <div className="flex -space-x-4">
        {[1, 2, 3].map((_, index) => (
          <Avatar key={index} id={index + 1} />
        ))}
      </div>
      <div>
        <p className="text-white">
          <span className="font-bold">250+</span> personnes
        </p>
        <p className="text-text-grey font-light">ont déjà rejoint</p>
      </div>
    </div>
  );
}

export default CardAvatar;
