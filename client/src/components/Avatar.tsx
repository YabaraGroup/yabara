function Avatar({ id }: { id: number }) {
  return (
    <figure className="w-24 h-24 bg-white rounded-full mb-4 flex items-center justify-center">
      <img
        src={`https://avatar.iran.liara.run/public/${id}`}
        alt="Avatar"
        className="rounded-full w-[90px] h-[90px]"
      />
    </figure>
  );
}

export default Avatar;
