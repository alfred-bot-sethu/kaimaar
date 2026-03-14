import nextPlugin from 'eslint-config-next';

export default [
  {
    ignores: ['.next/**/*', 'node_modules/**/*', 'dist/**/*'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...nextPlugin,
    rules: {
      ...nextPlugin.rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
