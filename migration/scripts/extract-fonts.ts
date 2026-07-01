import path from 'node:path';

import { readText, relativeFile, walkFiles, writeReport } from './shared';

const sourceRoots = ['app', 'components', 'styles'].map((dir) =>
  path.join(process.cwd(), dir),
);
const fontPattern = /font-(?:family|display|sans)|font-family:\s*([^;]+)/g;
const report = sourceRoots.flatMap(walkFiles).flatMap((filePath) => {
  const matches = Array.from(readText(filePath).matchAll(fontPattern)).map(
    (match) => match[0],
  );
  return matches.length ? [{ file: relativeFile(filePath), matches }] : [];
});

writeReport('fonts.json', report);
console.log(`Font report written with ${report.length} files.`);
