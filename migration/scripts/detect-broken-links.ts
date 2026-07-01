import path from 'node:path';

import { readText, relativeFile, walkFiles, writeReport } from './shared';

const sourceRoots = ['app', 'components', 'docs'].map((dir) =>
  path.join(process.cwd(), dir),
);
const hrefPattern = /href="([^"]+)"|href='([^']+)'/g;
const pages = new Set(
  walkFiles(path.join(process.cwd(), 'app'))
    .filter((filePath) => filePath.endsWith('page.tsx'))
    .map(
      (filePath) =>
        relativeFile(filePath)
          .replace(/^app/, '')
          .replace(/\/page\.tsx$/, '') || '/',
    ),
);

const issues = sourceRoots.flatMap(walkFiles).flatMap((filePath) => {
  const text = readText(filePath);
  const links = Array.from(text.matchAll(hrefPattern))
    .map((match) => match[1] ?? match[2])
    .filter(Boolean);

  return links
    .filter((link) => link.startsWith('/') && !pages.has(link))
    .map((link) => ({ file: relativeFile(filePath), link }));
});

writeReport('broken-links.json', issues);
console.log(`Broken link report written with ${issues.length} issues.`);
