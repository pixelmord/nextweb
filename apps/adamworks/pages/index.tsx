import { H1 } from 'ui';
import { formatDate } from 'utils';

export default function Home() {
  return (
    <div className="container mx-auto">
      <H1 className="text-center">Willkommen bei AdamWorks !🏔</H1>
      <p className="text-sm text-slate-600">{formatDate('2007-08-31T16:47+00:00')}</p>
    </div>
  );
}
