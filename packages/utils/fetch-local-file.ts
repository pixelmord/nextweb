import { promises as fs } from 'fs';
import path from 'path';

export default async function fetchLocalFile(fileRelPath: string) {
  const filePath = path.join(process.cwd(), fileRelPath);

  const fileContents = await fs.readFile(filePath, 'utf8');

  return filePath.endsWith('.json') ? JSON.parse(fileContents) : fileContents;
}
