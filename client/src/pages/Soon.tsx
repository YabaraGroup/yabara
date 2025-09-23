import EmailInput from '../components/EmailInput';
import CardAvatar from '../components/CardAvatar';

function Soon() {
  return (
    <section className="container-soon background min-h-screen flex flex-col items-center overflow-x-hidden px-5 py-10">
      <span className="mt-96 sm:mt-0">
        <CardAvatar />
      </span>

      {/* Titre principal */}
      <div className="mt-8 text-center text-white">
        <p className="flex flex-col xl:flex-row justify-center items-center gap-4">
          <span className="text-gold text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl title">
            Yabara
          </span>{' '}
          <span className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl xl:whitespace-nowrap tracking-tight title">
            arrive bientôt !
          </span>
        </p>

        {/* Sous-titre */}
        <div className="font-extralight text-base sm:text-lg md:text-xl my-10 text-text-grey max-w-3xl mx-auto">
          <p>Soyez parmi les premiers à rejoindre la plateforme qui transformera</p>
          <p>la façon de recruter et de trouver un emploi en Côte d’Ivoire.</p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md space-y-4">
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
