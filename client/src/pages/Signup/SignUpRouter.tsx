import { useParams } from 'react-router-dom';
import CompanyLayout from './company/CompanyLayout';
import TalentLayout from './talent/TalentLayout';

export default function SignUpRouter() {
  const { accountType } = useParams();

  if (accountType === 'company') {
    return <CompanyLayout />;
  }

  if (accountType === 'talent') {
    return <TalentLayout />;
  }

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <p className="text-gray-500">
        Type de compte inconnu : <strong>{accountType}</strong>
      </p>
    </div>
  );
}
