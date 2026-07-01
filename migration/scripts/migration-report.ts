import fs from 'node:fs';
import path from 'node:path';

import { reportsDir, writeReport } from './shared';

const reportFiles = fs.existsSync(reportsDir)
  ? fs.readdirSync(reportsDir).filter((file) => file.endsWith('.json'))
  : [];

const summary = reportFiles.map((file) => {
  const content = JSON.parse(
    fs.readFileSync(path.join(reportsDir, file), 'utf8'),
  ) as unknown[] | Record<string, unknown>;
  const count = Array.isArray(content)
    ? content.length
    : Object.keys(content).length;
  return { file, count };
});

writeReport('migration-summary.json', {
  generatedAt: new Date().toISOString(),
  reports: summary,
});
console.log(`Migration summary written with ${summary.length} report entries.`);
