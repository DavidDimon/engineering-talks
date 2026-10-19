import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/.nx/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
  {
    files: [
      'apps/**/*.{js,jsx,ts,tsx,cjs,mjs}',
      'courses/**/*.{js,jsx,ts,tsx,cjs,mjs}',
      'packages/**/*.{js,jsx,ts,tsx,cjs,mjs}',
      'presentations/**/*.{js,jsx,ts,tsx,cjs,mjs}',
      'talks/**/*.{js,jsx,ts,tsx,cjs,mjs}',
      'tools/**/*.{js,jsx,ts,tsx,cjs,mjs}',
    ],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:showcase',
              onlyDependOnLibsWithTags: ['scope:showcase', 'scope:shared'],
            },
            {
              sourceTag: 'scope:presentation',
              onlyDependOnLibsWithTags: ['scope:presentation', 'scope:shared'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
    },
  },
];
