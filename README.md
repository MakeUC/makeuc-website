# MakeUC Website

## Table of Contents

- [Getting Started](#getting-started)
- [Contributing](#contributing)
  - [Technology Stack](#technology-stack)
    - [Frontend (Client)](#frontend-client)
    - [Backend (Server)](#backend-server)
    - [Discord Bot](#discord-bot)
  - [Current Standards](#current-standards)


## Overview

This is the repository for the [MakeUC Website](https://makeuc.io)!

## Folder Structure & Sub-READMEs

This repository is organized into several main folders, each with its own README for details and practices specific to that part of the project:

- [client/README.md](client/README.md): Next.js frontend, registration enable/disable, theming, and SVG editing practices
- [discord-bot/README.md](discord-bot/README.md): Discord bot setup and usage
- [server/README.md](server/README.md): KeystoneJS backend and database

Refer to each folder's README for details on working with that part of the codebase.

## Getting Started

Note that yarn and a container engine are required for this project.

**If you are using Windows as your main environment, WSL is *strongly* recommended as using the devcontainer is very inconsistent on just Windows.**
**This means to use the `code .` command in WSL. You can read more [here](https://code.visualstudio.com/docs/remote/wsl).**

For a container engine, one of the following is recommended:
- [Rancher Desktop](https://rancherdesktop.io/) (Validated)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Validated)
- [Podman](https://podman.io/) (Untested)

Here are the steps to contributing to the MakeUC Website:

1. Clone the repository
2. Open the repository in VSCode
3. Run `Dev Containers: Reopen in Container` in the command pallet in VSCode (`CTRL+SHIFT+P` by default)
4. Using the terminal inside of VSCode, run `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Everyone is welcome to contribute! If you would like more information about the direction of the project, please contact us on the [MakeUC Website](https://makeuc.io/).

### Technology Stack

The following sections layout the notable libraries used in the MakeUC Website.

#### Frontend (Client)

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

#### Backend (Server)
  - [TypeScript](https://www.typescriptlang.org/)
  - [KeystoneJS](https://keystonejs.com/)
    - [Prisma](https://www.prisma.io/) is used by KeystoneJS and is the database engine

#### Discord Bot

TODO

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
