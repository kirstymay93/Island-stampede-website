import path from 'node:path';

import { readText, relativeFile, walkFiles, writeReport } from './shared';

const sourceRoots = ['app', 'components', 'styles'].map((dir) =>
  path.join(process.cwd(), dir),
);
const colorPattern = /#(?:[0-9a-fA-F]{3}){1,2}/g;
const colors = new Map<string, Set<string>>();

sourceRoots.flatMap(walkFiles).forEach((filePath) => {
  const matches = readText(filePath).match(colorPattern) ?? [];
  matches.forEach((match) => {
    const files = colors.get(match) ?? new Set<string>();
    files.add(relativeFile(filePath));
    colors.set(match, files);
  });
});

const report = Array.from(colors.entries()).map(([color, files]) => ({
  color,
  files: Array.from(files).sort(),
}));

writeReport('colors.json', report);
console.log(`Color report written with ${report.length} colors.`);
