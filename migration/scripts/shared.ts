import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const rootDir = process.cwd();
export const reportsDir = path.join(rootDir, 'migration', 'reports');
const ignoredDirectories = new Set([
  '.git',
  '.next',
  'node_modules',
  'out',
  'build',
]);

export function walkFiles(directory: string): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.name.startsWith('.')) {
      return [];
    }

    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        return [];
      }

      return walkFiles(entryPath);
    }

    return [entryPath];
  });
}

export function relativeFile(absolutePath: string) {
  return path.relative(rootDir, absolutePath).replace(/\\/g, '/');
}

export function writeReport(filename: string, data: unknown) {
  fs.mkdirSync(reportsDir, { recursive: true });
  const content = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(path.join(reportsDir, filename), content, 'utf8');
}

export function readText(absolutePath: string) {
  return fs.readFileSync(absolutePath, 'utf8');
}

export function fileHash(absolutePath: string) {
  return createHash('sha1').update(fs.readFileSync(absolutePath)).digest('hex');
}
