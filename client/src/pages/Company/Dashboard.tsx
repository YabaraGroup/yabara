import CardStat from '../../components/CardStat';
import SavedSearchCard from '../../components/SavedSearchCard';
import TalentCard from '../../components/TalentCard';
import SectionTitle from '../../components/SectionTitle';
import { avatarsMan } from '../../utils/imgAvatar';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div>
        <p className="text-gray-500">Accueil</p>
        <h1 className="text-4xl font-light my-5">
          Bienvenue sur <span className="font-semibold">YABARA</span>
        </h1>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Recrutement</h2>
          <div className="space-y-2">
            <a href="#" className="text-[#0e1d3a] font-medium hover:underline">
              Voir mes offres d'emploi →
            </a>
            <br />
            <a href="#" className="text-[#0e1d3a] font-medium hover:underline pt-2">
              Voir mes candidats →
            </a>
          </div>
        </div>
      </div>

      {/* Chiffres clés */}
      <section>
        <SectionTitle title="Chiffres clés" actionText="Voir tout" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CardStat title="Offres actives" value="21" trend="+2 le mois dernier" trendType="up" />
          <CardStat title="Candidatures" value="345" trend="-23 le mois dernier" trendType="down" />
          <CardStat title="Taux d’entretiens" value="15%" trendType="neutral" />
        </div>
      </section>

      {/* Recherches sauvegardées */}
      <section>
        <SectionTitle title="Recherches sauvegardées" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SavedSearchCard
            title="Chef de restauration H/F"
            location="Abidjan"
            contract="CDI"
            talents={234}
            trend="+2 ce mois"
          />
          <SavedSearchCard
            title="Jardinier H/F"
            location="Man"
            contract="CDI"
            talents={26}
            trend="+2 ce mois"
          />
          <SavedSearchCard
            title="Agent comptable H/F"
            location="Divo"
            contract="CDI"
            talents={109}
            trend="+2 ce mois"
          />
        </div>
      </section>

      {/* Talents suggérés */}
      <section>
        <SectionTitle title="Talents suggérés" actionText="Voir plus" />
        <p className="text-gray-700 font-medium mb-4">Gestionnaire de paie H/F · Abidjan</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <TalentCard
                key={i}
                name="KHKJT21"
                job="Développeur informatique"
                location="Abidjan"
                avatar={avatarsMan[0]}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
