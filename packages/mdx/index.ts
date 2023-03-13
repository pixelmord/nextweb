import glob from 'fast-glob';
import { promises as fs } from 'fs';
import hasha from 'hasha';
import { SerializeOptions } from 'next-mdx-remote/dist/types';
import { compileMDX } from 'next-mdx-remote/rsc';
import NodeCache from 'node-cache';
import path from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import * as z from 'zod';

import { IReadTimeResults, MdxFile, MdxFileData, Source } from './types';

export * from './types';

const mdxCache = new NodeCache();
export const enhanceFrontmatterReadingTime = (
  mdxContent: string
): { wordCount: number; readingTime: IReadTimeResults } => {
  return {
    wordCount: readingTime(mdxContent).words,
    readingTime: readingTime(mdxContent),
  };
};
export function createSource<T extends z.ZodType>(source: Source<T>) {
  const { contentPath, basePath, sortBy, sortOrder, mdxOptions } = source;

  async function getMdxFiles() {
    const files = await glob(`${contentPath}/**/*.{md,mdx}`);

    if (!files.length) return [];

    return files.map((filepath) => {
      let slug = filepath
        .replace(contentPath, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '');

      slug = slug.replace(/\/?index$/, '');

      return {
        filepath,
        slug,
        url: `${basePath?.replace(/\/$/, '')}/${slug}`,
      };
    });
  }

  async function getFileData(file: MdxFile, mdxNodeOptions?: SerializeOptions): Promise<MdxFileData<z.infer<T>>> {
    const raw = await fs.readFile(file.filepath, 'utf-8');
    const ReactDOMServer = (await import('react-dom/server')).default;
    const hash = hasha(raw.toString());

    const cachedContent = mdxCache.get<MdxFileData<z.infer<T>>>(hash);
    if (cachedContent?.hash === hash) {
      return cachedContent;
    }

    const mdx = await compileMDX<z.infer<T>>({
      source: raw,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            [
              rehypePrettyCode,
              {
                theme: 'one-dark-pro',
                onVisitLine(node: any) {
                  // Prevent lines from collapsing in `display: grid` mode, and allow empty
                  // lines to be copy/pasted
                  if (node.children.length === 0) {
                    node.children = [{ type: 'text', value: ' ' }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  node.properties.className.push('line--highlighted');
                },
                onVisitHighlightedWord(node: any) {
                  node.properties.className = ['word--highlighted'];
                },
              },
            ],
            rehypeAutolinkHeadings,
          ],
          ...mdxOptions,
          ...mdxNodeOptions,
        },
      },
    });
    let frontMatter = mdx.frontmatter ? (source.frontMatter.parse(mdx.frontmatter) as z.infer<T>) : null;
    frontMatter = {
      ...frontMatter,
      ...enhanceFrontmatterReadingTime(ReactDOMServer.renderToString(mdx.content)),
    };

    const fileData = {
      raw,
      frontMatter,
      hash,
      content: mdx.content,
    };

    mdxCache.set(hash, fileData);

    return fileData;
  }

  async function getMdxNode(slug: string | string[], mdxOptions?: SerializeOptions) {
    const _slug = Array.isArray(slug) ? slug.join('/') : slug;

    const files = await getMdxFiles();

    if (!files?.length) return null;

    const [file] = files.filter((file) => file.slug === _slug);

    if (!file) return null;

    const data = await getFileData(file, mdxOptions);

    return {
      ...file,
      ...data,
    };
  }

  async function getAllMdxNodes(includeDraft = false) {
    const files = await getMdxFiles();

    if (!files.length) return [];

    let nodes = await Promise.all(
      files.map(async (file) => {
        return await getMdxNode(file.slug);
      })
    );
    nodes = nodes.filter((node) => {
      if (node !== null) {
        if (!includeDraft && node.frontMatter.draft === true) {
          return false;
        }
        return true;
      }
    });
    if (!sortBy) {
      return nodes;
    }

    const adjust = sortOrder === 'desc' ? -1 : 1;

    return nodes.sort((a, b) => {
      if (!a || !b) {
        return 0;
      }
      if (a.frontMatter[sortBy] < b.frontMatter[sortBy]) {
        return -1 * adjust;
      }
      if (a.frontMatter[sortBy] > b.frontMatter[sortBy]) {
        return 1 * adjust;
      }
      return 0;
    });
  }

  return {
    getMdxFiles,
    getFileData,
    getMdxNode,
    getAllMdxNodes,
  };
}
