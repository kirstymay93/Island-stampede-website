import path from 'node:path';

import { fileHash, relativeFile, walkFiles, writeReport } from './shared';

const publicDirectory = path.join(process.cwd(), 'public');
const grouped = new Map<string, string[]>();

walkFiles(publicDirectory).forEach((filePath) => {
  const hash = fileHash(filePath);
  const files = grouped.get(hash) ?? [];
  files.push(relativeFile(filePath));
  grouped.set(hash, files);
});

const duplicates = Array.from(grouped.values()).filter(
  (files) => files.length > 1,
);
writeReport('duplicate-assets.json', duplicates);
console.log(
  `Duplicate asset report written with ${duplicates.length} duplicate groups.`,
);
