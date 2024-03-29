import Image from 'next/image';
import Link from 'next/link';
import { H2, H3 } from 'ui';

import { SectionBlockData } from '@/types';

export default function Section({ data }: { data: SectionBlockData }) {
  return (
    <section className="flex mb-5">
      {data.image && (
        <Link href={data.link} className="block w-36 lg:w-96 flex-shrink-0 overflow-hidden lg:aspect-1 self-stretch">
          <Image
            src={data.image}
            alt={data.heading}
            className="block object-cover max-w-none w-full h-full"
            width={+data.imageWidth}
            height={+data.imageHeight}
          />
        </Link>
      )}
      <div className="px-10 flex-grow">
        {data.heading && (
          <H2 className="">
            <Link href={data.link}>{data.heading}</Link>
          </H2>
        )}
        {data.subheading && (
          <H3>
            <Link href={data.link}>{data.subheading}</Link>
          </H3>
        )}
        {data.content && <div className="mt-6 prose dark:prose-invert">{data.content}</div>}
      </div>
    </section>
  );
}
