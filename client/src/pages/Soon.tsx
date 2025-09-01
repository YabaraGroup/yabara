import Avatar from '../components/Avatar';
import EmailInput from '../components/EmailInput';

function Soon() {
  return (
    <section className="background">
      <div className="flex items-center space-x-4">
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

      <div className="text-center text-9xl text-white">
        <span className="text-gold">Yabara</span> arrive bientôt !
        <div className="font-light text-3xl my-10 text-text-grey">
          <p>Soyez parmis les premiers à rejoindre la plateforme qui transformera</p>
          <p>la façon de recruter et de trouver un emploi en Côte d'Ivoire.</p>
        </div>
      </div>
      <div>
        <p className="text-white text-xl text-center font-light">
          L'avenir du recrutement arrive bientôt
        </p>
        <EmailInput />
        <p className="text-white text-xl text-center font-light">Promis, pas de spam 🙌</p>
      </div>
    </section>
  );
}

export default Soon;
