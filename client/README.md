# Task Manager App - Client Side 
# by Aviv Perets : https://github.com/avivperets26

This application is a task manager built using React and TypeScript, bundled with Vite. It uses Redux toolkit for state management and CSS Modules for styling. The application is designed to be responsive across mobile, laptop screens, and monitors.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Vitest**: A fast and lightweight testing framework designed specifically for Vite.
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **CSS Modules**: A CSS file in which all class names and animation names are scoped locally by default.

## Installation Steps

1. Clone the project from the git repository.
2. Install the dependencies using `npm install`.
3. Run the application using `vite`.
4. Run the tests using `vitest` or `npm test`.
   

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

