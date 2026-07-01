import path from 'node:path';

import { relativeFile, walkFiles, writeReport } from './shared';

const publicDirectory = path.join(process.cwd(), 'public');
const files = walkFiles(publicDirectory).map(relativeFile);

const report = {
  generatedAt: new Date().toISOString(),
  totalAssets: files.length,
  assets: files,
};

writeReport('asset-analysis.json', report);
console.log(`Asset analysis written with ${files.length} files.`);
