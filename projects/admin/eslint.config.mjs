import {FlatCompat} from '@eslint/eslintrc';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import prettierConfig from './.prettierrc.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/query/recommended',
  ),
  ...compat.config({
    rules: {
      'prettier/prettier': ['warn', prettierConfig],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'react/display-name': 'off',
    },
  }),
];

export default eslintConfig;
