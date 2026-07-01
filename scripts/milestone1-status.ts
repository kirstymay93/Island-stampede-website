/**
 * Island Stampede - Milestone 1 Status Checker
 *
 * RUN:
 * npx tsx scripts/milestone1-status.ts
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function exists(relativePath: string) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function scoreCheck(label: string, condition: boolean, weight: number) {
  return {
    label,
    passed: condition,
    weight,
  };
}

function checkPackageJson() {
  if (!exists('package.json')) {
    return { score: 0, issues: ['Missing package.json'] };
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'),
  ) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  const deps = {
    next: pkg.dependencies?.next,
    react: pkg.dependencies?.react,
    typescript: pkg.devDependencies?.typescript || pkg.dependencies?.typescript,
    tailwind: pkg.dependencies?.tailwindcss,
    framer: pkg.dependencies?.['framer-motion'],
  };

  const checks = [
    scoreCheck('Next.js', Boolean(deps.next), 20),
    scoreCheck('React', Boolean(deps.react), 15),
    scoreCheck('TypeScript', Boolean(deps.typescript), 15),
    scoreCheck('Tailwind', Boolean(deps.tailwind), 15),
    scoreCheck('Framer Motion', Boolean(deps.framer), 10),
  ];

  const score = checks.reduce(
    (total, check) => total + (check.passed ? check.weight : 0),
    0,
  );
  const issues = checks
    .filter((check) => !check.passed)
    .map((check) => `Missing dependency: ${check.label}`);

  return { score, issues };
}

function checkCoreFiles() {
  const checks = [
    scoreCheck('app directory', exists('app'), 15),
    scoreCheck('layout.tsx', exists('app/layout.tsx'), 5),
    scoreCheck('page.tsx', exists('app/page.tsx'), 5),
    scoreCheck('tsconfig.json', exists('tsconfig.json'), 5),
    scoreCheck(
      'tailwind config',
      exists('tailwind.config.ts') || exists('tailwind.config.js'),
      5,
    ),
    scoreCheck(
      'eslint config',
      exists('eslint.config.js') || exists('.eslintrc.json'),
      5,
    ),
    scoreCheck('github actions', exists('.github/workflows'), 5),
  ];

  const score = checks.reduce(
    (total, check) => total + (check.passed ? check.weight : 0),
    0,
  );
  const issues = checks
    .filter((check) => !check.passed)
    .map((check) => `Missing file: ${check.label}`);

  return { score, issues };
}

function checkMigrationStructure() {
  const required = [
    'migration',
    'migration/original',
    'migration/scripts',
    'migration/reports',
  ];
  const checks = required.map((directory) =>
    scoreCheck(directory, exists(directory), 3),
  );
  const score = checks.reduce(
    (total, check) => total + (check.passed ? check.weight : 0),
    0,
  );
  const issues = checks
    .filter((check) => !check.passed)
    .map((check) => `Missing directory: ${check.label}`);

  return { score, issues };
}

function run() {
  console.log('\n📊 Island Stampede - Milestone 1 Status\n');

  const pkg = checkPackageJson();
  const core = checkCoreFiles();
  const migration = checkMigrationStructure();
  const totalScore = pkg.score + core.score + migration.score;
  const maximumScore = 132;
  const normalizedScore = Math.round((totalScore / maximumScore) * 100);
  const issues = [...pkg.issues, ...core.issues, ...migration.issues];

  console.log(`\n🏗️ Build Score: ${normalizedScore}/100\n`);

  if (issues.length === 0) {
    console.log('🎉 Milestone 1 COMPLETE - READY FOR NEXT PHASE\n');
  } else {
    console.log('⚠️ Issues Found:\n');
    issues.forEach((issue) => console.log(` - ${issue}`));
  }

  console.log('\n📌 Breakdown:');
  console.log(` - Dependencies: ${pkg.score}/75`);
  console.log(` - Core Files: ${core.score}/45`);
  console.log(` - Migration Setup: ${migration.score}/12`);
  console.log('\n');
}

run();
