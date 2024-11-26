module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } }, // 'detect' pour utiliser la version installée
  plugins: ['react-refresh'],
  rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
      ],
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      "no-unused-vars": "off"
    }
}