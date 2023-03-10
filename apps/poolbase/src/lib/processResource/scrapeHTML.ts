import { parse } from 'node-html-parser';
import { chromium, devices } from 'playwright';
import { ResourceData } from 'src/types';

export const prefixHref = (href: string, url: string): string => {
  const urlObj = new URL(url);
  if (href.startsWith('http')) {
    return href;
  }
  if (href.startsWith('//')) {
    return urlObj.protocol + href;
  }
  if (href.startsWith('/')) {
    return urlObj.protocol + '//' + urlObj.host + href;
  }
  return url + href;
};

export const findMainContentElement = (document: Document): HTMLElement | null => {
  const body = document.querySelector('body');
  const bodyText = document.querySelector('body')?.innerText;
  let main = document.querySelector('main');
  if (main) {
    return main;
  }
  main = document.querySelector('#main');
  if (main && bodyText && main.innerText.length >= bodyText?.length * 0.3) {
    return main;
  }
  main = document.querySelector('.main');
  if (main && bodyText && main.innerText.length >= bodyText?.length * 0.3) {
    return main;
  }
  main = document.querySelector('#content');
  if (main && bodyText && main.innerText.length >= bodyText?.length * 0.3) {
    return main;
  }
  return body;
};

export const determineImageScore = (image: HTMLImageElement): number => {
  let score = 0;
  let src;
  if (image.getAttribute('src')) {
    src = image.getAttribute('src');
  }
  if (!src) {
    return -10000;
  }

  const rules = [
    { pattern: /(large|big)/, score: 1 },
    { pattern: /static/, score: 1 },
    { pattern: /upload/, score: 1 },
    { pattern: /media/, score: 1 },
    { pattern: /gravatar.com/, score: -1 },
    { pattern: /feeds.feedburner.com/, score: -1 },
    { pattern: /icon/i, score: -1 },
    { pattern: /logo/i, score: -1 },
    { pattern: /spinner/i, score: -1 },
    { pattern: /loading/i, score: -1 },
    { pattern: /badge/, score: -1 },
    { pattern: /1x1/, score: -1 },
    { pattern: /pixel/, score: -1 },
    { pattern: /ads/i, score: -1 },
    { pattern: /doubleclick/i, score: -1 },
  ];

  for (let i = 0, l = rules.length; i < l; i++) {
    if (rules[i].pattern.exec(src)) {
      score += rules[i].score;
    }
  }
  return score;
};

export const findBestImage = (img: HTMLImageElement[]): string | null => {
  const images: { img: HTMLImageElement; surface: number; score: number }[] = [];
  for (let i = 0, l = img.length; i < l; i++) {
    //Look for lazy loaded images
    if (img[i].getAttribute('data-src')) {
      img[i].setAttribute('src', img[i].getAttribute('data-src') || '');
    }
    if (img[i].getAttribute('data-lazy-src')) {
      img[i].setAttribute('src', img[i].getAttribute('data-lazy-src') || '');
    }

    //Compute surface
    const w = +(img[i].naturalWidth || img[i].getAttribute('width') || 1);
    const h = +(img[i].naturalHeight || img[i].getAttribute('height') || 1);
    const surface = w * h;

    const score = determineImageScore(img[i]);

    //Filter by size and minimum score
    if (score >= 0 && surface > 100 * 100) {
      images.push({ img: img[i], surface, score });
    }
  }

  if (images.length > 0) {
    //Sort by score
    images.sort((a, b) => {
      if (a.surface === b.surface) {
        return b.score - a.score;
      } else {
        return b.surface - a.surface;
      }
    });

    return images[0].img.src;
  }
  return null;
};
export const getMainImageUrlFromMainElement = (main) => {
  const img = main.getElementsByTagName('img');
  return findBestImage(img);
};

export const getMainImageUrl = (document: Document, main: HTMLElement, url: string): string | null => {
  let mainImage = document.querySelector('meta[property="og:image"]');
  if (mainImage && mainImage.getAttribute('content')?.trim().length) {
    return mainImage.getAttribute('content');
  }
  mainImage = document.querySelector('meta[name="twitter:image"]');
  if (mainImage && mainImage.getAttribute('content')?.trim().length) {
    return mainImage.getAttribute('content');
  }
  if (main) {
    const mainImageUrl = getMainImageUrlFromMainElement(main);
    if (mainImageUrl) {
      return prefixHref(mainImageUrl, url);
    }
  }
  return null;
};

export const extractFromHead = (document: Document, url: string) => {
  const urlObj = new URL(url);
  let headData = {
    ...(!!document.querySelector('title') && {
      meta_title: document?.querySelector('title')?.innerText.trim(),
      title: document?.querySelector('title')?.innerText.trim(),
    }),
    ...(!!document.querySelector('meta[name="keywords"]') && {
      meta_keywords: document
        ?.querySelector('meta[name="keywords"]')
        ?.getAttribute('content')
        ?.split(',')
        .map((keyword) => keyword.trim()),
    }),
    ...(!!document.querySelector('meta[name="author"]') && {
      meta_author: document?.querySelector('meta[name="author"]')?.getAttribute('content'),
    }),
    ...(!!document.querySelector('meta[name="publisher"]') && {
      meta_publisher: document?.querySelector('meta[name="publisher"]')?.getAttribute('content'),
    }),
    ...(!!document.querySelector('meta[name="description"]') && {
      meta_description: document?.querySelector('meta[name="description"]')?.getAttribute('content'),
    }),
    ...(!!document.querySelector('head > link[rel*="icon"]') && {
      meta_icon_url: prefixHref(
        document!.querySelector('head > link[rel*="icon"]')!.getAttribute('href') as string,
        url
      ),
    }),
  };
  if (urlObj.hostname === 'github.com') {
    const tags: HTMLAnchorElement[] = Array.from(document.querySelectorAll('a.topic-tag'));
    if (tags.length) {
      headData = {
        ...headData,
        meta_keywords: tags.map((tag) => tag.innerText),
      };
    }
  }
  return headData;
};

export const scrapeDocument = (document: Document, url: string): Partial<ResourceData> => {
  const main = findMainContentElement(document);
  const main_text = main?.innerText;
  let main_image_url = '';
  if (main) {
    main_image_url = getMainImageUrl(document, main, url) || '';
  }

  const headTags = extractFromHead(document, url);

  return {
    ...headTags,
    ...(main_text?.length && { main_text }),
    ...(main_image_url?.length && { main_image_url }),
    processed: ['html'],
  };
};

export type ResourceProvider = 'github' | 'website' | 'linear' | 'notion';
export const determineResourceProvider = (url: string): ResourceProvider => {
  const urlObject = new URL(url);
  switch (urlObject.hostname) {
    case 'github.com':
      return 'github';
    default:
      return 'website';
  }
};
export const scrape = async (url): Promise<{ data: Partial<ResourceData>; screenshot: Buffer }> => {
  let start = Date.now();
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['Desktop Chrome'],
    // locale: 'de-DE',
    // timezoneId: 'Europe/Berlin',
    // permissions: ['geolocation'],
  });
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForLoadState('load');
  let end = Date.now();
  console.debug(`Loaded page in: ${end - start} ms`);
  start = Date.now();
  const content = await page.content();
  const document = parse(content) as unknown as Document;
  const data = scrapeDocument(document, url);
  end = Date.now();
  console.debug(`processed parsing in: ${end - start} ms`);
  start = Date.now();
  const screenshot = await page.screenshot();
  end = Date.now();
  console.debug(`processed screenshot in: ${end - start} ms`);
  await browser.close();
  return { data, screenshot };
};
export default scrape;
