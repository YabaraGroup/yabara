import image_1 from '../assets/comingsoon/man1.png';
import image_2 from '../assets/comingsoon/woman1.png';
import image_3 from '../assets/comingsoon/man2.png';

function Avatar({ id }: { id: number }) {
  return (
    <figure className="w-24 h-24 bg-white rounded-full mb-4 flex items-center justify-center">
      <img
        src={id === 1 ? image_1 : id === 2 ? image_2 : image_3}
        alt="Avatar"
        className="rounded-full w-[90px] h-[90px]"
      />
    </figure>
  );
}

export default Avatar;
