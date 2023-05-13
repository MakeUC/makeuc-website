# MakeUC Website

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Contributing

The primary tools in this project are:

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
  - NextJS 13+ is being used with the **app directory**. This is a brand-new and stable feature that differs from normal React applications. Please be familiar with the **app directory** before making contributions.
  - To learn more about Next.js, take a look at the following resources:
    - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
    - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)
  - Plugins in use:
    - [PostCSS Import](https://github.com/postcss/postcss-import#readme)
    - [PostCSS Preset Env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#readme)


### Current Standards

1. Every application file should use TypeScript instead of JavaScript.
2. At this time, no component library is being used. This is due to the very new **app directory** feature in NextJS. At this current time, every major component library does not have proper support for Server Components.
3. Server Components are preferred to Client Components. This allows the majority of the site to be rendered on the server side. Additionally, a "tree" based approach should be used with components, and as such, the Client Components should be the leaf nodes.
4. [Yarn](https://yarnpkg.com/) is the package manager of choice. 
5. For styling, the following ways are in order of their preference. [Here are the definitions](https://nextjs.org/docs/app/building-your-application/styling).
    - Tailwind CSS
    - CSS Modules
    - Global CSS
    - CSS-in-JS (other methods preferred instead)
6. Use the linting tools and their rules to ensure uniformity. Below is a list of configured linting tools.
    - ESLint
    - Stylelint