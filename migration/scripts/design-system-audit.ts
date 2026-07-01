import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const repositoryRoot = path.resolve(__dirname, '../..');
const includeDirectories = ['app', 'components'];
const includeExtensions = new Set(['.ts', '.tsx']);
const exemptDirectories = [
  path.join('components', 'ui'),
  path.join('components', 'layout'),
];

const deepImportPattern =
  /from\s+['"]@\/components\/(?:ui|layout)\/[^'"]+['"]/g;

async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    if (includeExtensions.has(path.extname(entry.name))) {
      files.push(absolutePath);
    }
  }

  return files;
}

function isExempt(relativePath: string): boolean {
  return exemptDirectories.some(
    (directory) =>
      relativePath === directory || relativePath.startsWith(`${directory}/`),
  );
}

async function main() {
  const violations: string[] = [];
  const filesToCheck: string[] = [];

  for (const directory of includeDirectories) {
    const absoluteDirectory = path.join(repositoryRoot, directory);
    filesToCheck.push(...(await collectFiles(absoluteDirectory)));
  }

  filesToCheck.sort((a, b) => a.localeCompare(b));

  for (const absolutePath of filesToCheck) {
    const relativePath = path.relative(repositoryRoot, absolutePath);

    if (isExempt(relativePath)) {
      continue;
    }

    const content = await readFile(absolutePath, 'utf8');
    const matches = content.match(deepImportPattern);

    if (!matches?.length) {
      continue;
    }

    violations.push(
      `${relativePath}: use barrel imports '@/components/ui' or '@/components/layout' instead of deep imports`,
    );
  }

  if (violations.length > 0) {
    console.error('Design system audit failed.\n');
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Design system audit passed (${filesToCheck.length} files scanned).`,
  );
}

main().catch((error) => {
  console.error('Design system audit failed with an unexpected error.');
  console.error(error);
  process.exitCode = 1;
});
