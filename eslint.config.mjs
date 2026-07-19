import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      boundaries,
      import: importPlugin,
      'react-refresh': reactRefresh,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'fsd-pages', pattern: 'src/fsd-pages/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'import/first': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'classnames',
              message: 'Используйте cn из @/shared/lib/cn.',
            },
            {
              name: 'clsx',
              message:
                'Используйте cn из @/shared/lib/cn. Прямой импорт clsx разрешён только внутри helper-файла cn.ts.',
            },
          ],
          patterns: [
            {
              group: ['@/shared/ui/*/*'],
              message:
                'Компоненты из shared/ui импортируем через public API компонента: @/shared/ui/button.',
            },
          ],
        },
      ],

      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            {
              from: { element: { type: 'fsd-pages' } },
              disallow: { to: { element: { type: ['app'] } } },
              message: 'fsd-pages не должны импортировать слой app.',
            },
            {
              from: { element: { type: 'widgets' } },
              disallow: { to: { element: { type: ['app', 'fsd-pages'] } } },
              message: 'Widgets не должны импортировать вышестоящие слои.',
            },
            {
              from: { element: { type: 'features' } },
              disallow: {
                to: { element: { type: ['app', 'fsd-pages', 'widgets'] } },
              },
              message: 'Features не должны импортировать вышестоящие слои.',
            },
            {
              from: { element: { type: 'entities' } },
              disallow: {
                to: {
                  element: {
                    type: ['app', 'fsd-pages', 'widgets', 'features'],
                  },
                },
              },
              message: 'Entities не должны импортировать вышестоящие слои.',
            },
            {
              from: { element: { type: 'shared' } },
              disallow: {
                to: {
                  element: {
                    type: [
                      'app',
                      'fsd-pages',
                      'widgets',
                      'features',
                      'entities',
                    ],
                  },
                },
              },
              message: 'Shared не должен импортировать вышестоящие слои.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/lib/cn.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'classnames',
              message: 'Используйте clsx внутри cn helper.',
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
]);

export default eslintConfig;
