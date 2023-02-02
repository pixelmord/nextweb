import Image from 'next/image';
import { FiGithub, FiLink, FiLinkedin, FiMail, FiPhone, FiTwitter } from 'react-icons/fi';
import { Container, H2, H3 } from 'ui';
import fetchLocalFile from 'utils/fetch-local-file';

import { Locale, i18n } from '@/config/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

const socialIcons = {
  Twitter: () => <FiTwitter className="w-5 h-5" />,
  GitHub: () => <FiGithub className="w-5 h-5" />,
  LinkedIn: () => <FiLinkedin className="w-5 h-5" />,
};
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function ResumePage({ params: { lang } }: { params: { lang: Locale } }) {
  const data = await fetchLocalFile(`src/data/resume.${lang}.json`);
  const dictionary = await getDictionary(lang);

  return (
    <Container className="mt-6" hspace="article">
      <div className="grid bg-white dark:bg-black grid-cols-1 lg:grid-cols-[2.5fr,1fr] w-full">
        <div className="p-6 prose dark:prose-invert">
          <h2>{dictionary['resume'].profileHl}</h2>
          <p className="leading-tight">{data.basics.summary}</p>
        </div>
        <div className="bg-base-300 dark:bg-base-600">
          <div className="p-4 text-center">
            {data.basics.picture && (
              <Image
                className="block rounded-full mx-auto w-12 h-12 lg:w-32 lg:h-32"
                width={130}
                height={130}
                alt="Andreas Adam"
                src={data.basics.picture}
              />
            )}
            <H2 styling="h3" className="inline-block">
              {data.basics.name}
            </H2>
            <H3 styling="h5" className="inline-block">
              {data.basics.label}
            </H3>
          </div>
          <div className="p-5 space-y-3 bg-base-500 dark:bg-base-400">
            <a className="flex items-center space-x-2 font-medium " href={`mailto:${data.basics.email}`}>
              <FiMail className="w-5 h-5" /> <span className="inline-block">{data.basics.email}</span>
            </a>
            <a className="flex items-center space-x-2 font-medium" href={`tel:${data.basics.phone}`}>
              <FiPhone className="w-5 h-5" /> <span className="inline-block">{data.basics.phone}</span>
            </a>
            <a className="flex items-center space-x-2 font-medium" href={`${data.basics.website}`}>
              <FiLink className="w-5 h-5" /> <span className="inline-block">{data.basics.website}</span>
            </a>
            <hr />
            {data.basics.profiles.length &&
              data.basics.profiles.map((profile) => (
                <a key={profile.url} className="flex items-center space-x-2 font-medium" href={`${profile.url}`}>
                  {socialIcons[profile.network]()} <span className="inline-block">{profile.url}</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
