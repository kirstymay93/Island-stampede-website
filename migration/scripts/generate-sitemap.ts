import path from 'node:path';

import { relativeFile, walkFiles, writeReport } from './shared';

const appDirectory = path.join(process.cwd(), 'app');
const pages = walkFiles(appDirectory)
  .filter((filePath) => filePath.endsWith('page.tsx'))
  .map((filePath) => {
    const relativePath = relativeFile(filePath);
    const route =
      relativePath
        .replace(/^app/, '')
        .replace(/\/page\.tsx$/, '')
        .replace(/\/\(routes\)/g, '') || '/';

    return {
      file: relativePath,
      route,
    };
  });

writeReport('sitemap.json', pages);
console.log(`Sitemap written with ${pages.length} routes.`);
