import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>😵 Oups, une erreur est survenue</h1>
      <p>Essayez de recharger la page ou revenir plus tard.</p>
      <pre style={{ color: 'red' }}>
        {typeof error === 'object' && error !== null
          ? (error as any).statusText || (error as any).message
          : String(error)}
      </pre>
    </div>
  );
}
