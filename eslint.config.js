import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import oxlint from 'eslint-plugin-oxlint'
import prettier from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintConfigPrettier,
      prettier,
      oxlint.configs['flat/recommended'],
      pluginQuery.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
