import { promises as fs } from 'fs';
import path from 'path';

export default async function fetchLocalFile<T>(fileRelPath: string): Promise<T> {
  const filePath = path.join(process.cwd(), fileRelPath);

  const fileContents = await fs.readFile(filePath, 'utf8');

  return filePath.endsWith('.json') ? JSON.parse(fileContents) : fileContents;
}
