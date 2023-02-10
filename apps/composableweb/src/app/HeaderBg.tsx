'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import config from '@/config';

export const HeaderBg = () => {
  const pathname = usePathname();
  const data =
    Object.values(config.links)
      .flat()
      .find((link) => link.href === pathname && link.image !== '') ||
    config.links.main.find((link) => link.href === '/');

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full -z-10">
      <Image
        src={data.image}
        alt={data.text}
        className="block object-cover max-w-none w-full h-full opacity-10"
        width={+data.imageWidth}
        height={+data.imageHeight}
        quality={5}
      />
    </div>
  );
};
export default HeaderBg;
