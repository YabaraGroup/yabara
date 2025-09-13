import EmailInput from '../components/EmailInput';
import CardAvatar from '../components/CardAvatar';

function Soon() {
  return (
    <section className="background">
      <CardAvatar />

      <div className="text-center text-7xl sm:text-9xl text-white px-5 py-2">
        <p className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <span className="text-gold">Yabara</span>{' '}
          <span className="text-5xl sm:text-9xl">arrive bientôt !</span>
        </p>
        <div className="font-extralight text-xl my-10 text-text-grey">
          <p>Soyez parmi les premiers à rejoindre la plateforme qui transformera</p>
          <p>la façon de recruter et de trouver un emploi en Côte d’Ivoire.</p>
        </div>
      </div>
      <div>
        <p className="text-white text-xl text-center font-light hidden sm:block">
          L'avenir du recrutement arrive bientôt
        </p>
        <EmailInput />
        <p className="text-white text-xl text-center font-light">Promis, pas de spam 🙌</p>
      </div>
    </section>
  );
}

export default Soon;
