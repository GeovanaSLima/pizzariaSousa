import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    files: ['**/*.js', '**/*.mjs'], // Configurações para Node.js
    languageOptions: {
      globals: {
        ...globals.node, // Inclui os globais do Node.js
        ...globals.jest, // Inclui os globais do Jest
      },
    },
    env: {
      node: true,
      jest: true, // Permite usar Jest no backend
    },
  },
  {
    files: ['**/*.{ts,tsx}'], // Configurações para Next.js com TypeScript
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      // Adicione regras específicas aqui, se necessário
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'), // Extensões do Next.js e TypeScript
];
