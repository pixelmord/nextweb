import { BaseFrontmatterSchema, MarkdownFrontmatter } from 'mdx';
import { z } from 'zod';

export type PostFrontmatter = MarkdownFrontmatter & z.infer<typeof BaseFrontmatterSchema>;
export type BlogFrontmatter = PostFrontmatter;
export type CodeRecipeFrontmatter = PostFrontmatter;
export type PageFrontmatter = PostFrontmatter;

export type PageData = {
  title: string;
  metaTitle: string;
};

export const ResumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string(),
    picture: z.string(),
    email: z.string(),
    phone: z.string(),
    website: z.string(),
    summary: z.string(),
    location: z.object({
      address: z.string(),
      postalCode: z.string(),
      city: z.string(),
      countryCode: z.string(),
      region: z.string(),
    }),
    profiles: z
      .object({
        network: z.string(),
        username: z.string(),
        url: z.string().url(),
      })
      .array(),
  }),
  work: z
    .object({
      company: z.string(),
      position: z.string(),
      website: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      summary: z.string(),
      highlights: z.string().array(),
    })
    .array(),
  volunteer: z
    .object({
      organization: z.string(),
      position: z.string(),
      website: z.string().url(),
      startDate: z.string(),
      endDate: z.string(),
      summary: z.string(),
      highlights: z.string().array(),
    })
    .array(),
  education: z
    .object({
      institution: z.string(),
      area: z.string(),
      studyType: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      gpa: z.string(),
      courses: z.string().array(),
    })
    .array(),
  awards: z
    .object({
      title: z.string(),
      date: z.string(),
      awarder: z.string(),
      summary: z.string(),
    })
    .array(),
  publications: z
    .object({
      name: z.string(),
      publisher: z.string(),
      releaseDate: z.string(),
      website: z.string().url(),
      summary: z.string(),
    })
    .array(),
  skills: z
    .object({
      name: z.string(),
      level: z.string(),
      keywords: z.string().array(),
    })
    .array(),
  languages: z
    .object({
      language: z.string(),
      fluency: z.string(),
    })
    .array(),
  interests: z
    .object({
      name: z.string(),
      keywords: z.string().array(),
    })
    .array(),
  references: z
    .object({
      name: z.string(),
      reference: z.string(),
    })
    .array(),
});
export type ResumeData = z.infer<typeof ResumeSchema>;

export type SectionBlockData = {
  content: string;
  heading: string;
  subheading: string;
  image: string;
  imageWidth: string;
  imageHeight: string;
  link: string;
  tags: string[];
};
export type ArticleTeaserData = {
  content: string;
  heading: string;
  subheading: string;
  image: string;
  link: string;
  tags: string[];
};
