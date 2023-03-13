import { SerializeOptions } from 'next-mdx-remote/dist/types';
import { z } from 'zod';

export interface Source<T> {
  contentPath: string;
  basePath: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  frontMatter: T;
  mdxOptions?: SerializeOptions;
}

export interface MdxFile {
  filepath: string;
  slug: string;
  url: string;
}

export interface MdxFileData<TFrontmatter = MarkdownFrontmatter> {
  raw: string;
  hash: string;
  frontMatter: TFrontmatter;
  content: React.ReactElement;
}
export type MarkdownObject = {
  [name: string]: string | string[] | number | number[] | boolean | MarkdownObject;
};
export type MarkdownFrontmatter = Record<
  string,
  string | string[] | number | number[] | boolean | IReadTimeResults | MarkdownObject
>;
export const IReadTimeResultsSchema = z.object({
  text: z.string().optional(),
  time: z.number().optional(),
  words: z.number().optional(),
  minutes: z.number().optional(),
});
export type IReadTimeResults = z.infer<typeof IReadTimeResultsSchema>;
export const BaseFrontmatterSchema = z.object({
  title: z.string(),
  dateCreated: z.string(),
  datePublished: z.string(),
  dateModified: z.string().optional(),
  draft: z.boolean(),
  summary: z.string().optional(),
  tags: z.string().array().optional(),
  wordCount: z.number().optional(),
  readingTime: IReadTimeResultsSchema.optional(),
});

export type BaseFrontmatter = z.infer<typeof BaseFrontmatterSchema>;
