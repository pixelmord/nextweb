import { BaseFrontmatter, MarkdownFrontmatter } from 'mdx';
import { z } from 'zod';

export type PostFrontmatter = MarkdownFrontmatter & BaseFrontmatter;
export const RecipeSchema = z.object({
  name: z.string(),
  difficulty: z.string().optional(),
  image: z.string().nullable().array().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  recipeCuisine: z.string().optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  totalTime: z.string().optional(),
  keywords: z.string().array().optional(),
  recipeYield: z.number().optional(),
  recipeCategory: z.string().optional(),
  nutrition: z
    .object({
      calories: z.number().optional(),
      proteinContent: z.number().optional(),
      fatContent: z.number().optional(),
      carbohydrateContent: z.number().optional(),
    })
    .optional(),
  recipeIngredient: z.string().array().optional(),
  recipeInstructions: z.string().array().optional(),
  video: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      thumbnailUrl: z.string().array().optional(),
      contentUrl: z.string().optional(),
      embedUrl: z.string().optional(),
      uploadDate: z.string().optional(),
      duration: z.string().optional(),
      expires: z.string().optional(),
    })
    .optional(),
});

export type RecipeFrontmatter = PostFrontmatter & z.infer<typeof RecipeSchema>;
