import path from 'node:path';

import { readText, relativeFile, walkFiles, writeReport } from './shared';

const sourceRoots = ['app', 'components', 'styles'].map((dir) =>
  path.join(process.cwd(), dir),
);
const typePattern = /(text-[^\s"']+|tracking-\[[^\]]+\]|leading-[^\s"']+)/g;
const report = sourceRoots.flatMap(walkFiles).flatMap((filePath) => {
  const matches = Array.from(
    new Set(readText(filePath).match(typePattern) ?? []),
  );
  return matches.length ? [{ file: relativeFile(filePath), matches }] : [];
});

writeReport('typography.json', report);
console.log(`Typography report written with ${report.length} files.`);
