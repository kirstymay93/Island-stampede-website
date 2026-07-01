const path = require('node:path');

module.exports = {
  '*.{ts,tsx}': (files) => {
    const lintableFiles = files.filter(
      (file) => path.basename(file) !== 'next-env.d.ts',
    );

    if (lintableFiles.length === 0) {
      return [];
    }

    return [`eslint --fix --max-warnings=0 ${lintableFiles.join(' ')}`];
  },
  '*': ['prettier --write --ignore-unknown'],
};
