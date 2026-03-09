## Setup

### Environment Variables

The backend of this project requires usage of environment variables to access the database and the Discord bot. Make sure to contact with your Technical Lead to obtain these credentials if your task is to mess with the backend in any capacity.

Specifically, after obtaining these credentials, navigate to `/.devcontainer` and create a file called `.env.local`. Then, copy the fields from `.env.local.default` to this new file and fill in the missing credentials.

### GitHub Codespaces

If you have free GitHub pro from the Student benefits (sign up for it, I highly recommend, you get a bunch of free stuff), you can use codespaces to save the massive hassle of setting multiple things up in the local environment.

GitHub Codespaces comes with a Linux environment preinstalled, plus built-in support for devcontainers. If you're interested in how Codespaces work, you can read the documenations [here](https://docs.github.com/en/codespaces/overview).

You should open a new Codespace from the `main` branch. On creation, GitHub will automatically detect that this project is using a devcontainer, and automatically perform the necessary steps to set the project up.

**Important**: After the Codespace was set up for me, I noticed some problems with installing packages that was ignored. Just to be sure, after your Codespace is configured, run `yarn install` in the command line.

### Local Development

#### Common Setup Steps

1. Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed (or Rancher Desktop, if you managed to get it working with VSCode). Also have [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/getting-started/install) installed.
2. Clone the repository and open the repository in VSCode.
3. Make sure that you have the `Dev Container` extension installed in VSCode. Then open the command pallet for VSCode with `F1` or `CTRL+SHIFT+P` and run `Dev Containers: Reopen in Container`.
4. Open the terminal inside VSCode (the one that is spawned from the container) and run `yarn install`.
5. Run the development command for whichever application you're using. `yarn dev` runs every single application in this monorepo, whereas `yarn dev:client` runs only the NextJS frontend, for example. The rule of thumb here is `dev:[file]`.

#### Push Hooks

To push, a pre-push hook is run. Inside this hook, `yarn build` is executed. To successfully push to the git repository while satisfying the pre-push hook, first have the server started with `yarn dev:server` before running `git push`.

#### General Known Bug

If the build fails, particularly on the client, a cached build may have been used and this cache is not being invalidated (especially if no changes to the server have been made). To invalidate said cached build, remove the `.next` folder in the client directory.

#### Dev Container & Docker Troubleshooting

If Dev Containers fail to start, check the "Terminal" tab in VS Code. If it's a Docker build error, you may need to scroll up through the logs to find the root cause.

- **`request returned 500 Internal Server Error for API route and version http://%2FUsers.../v1.52/version` (Mac/Linux):**
  This means the Docker Daemon crashed or hung locally.
  _Fix:_ Quit Docker Desktop, force quit any remaining "Docker" processes in Activity Monitor / System Monitor, and restart Docker Desktop. Wait until "Engine Running" appears, then try again.

- **`mkdir: can't create directory...: No space left on device` or `tar: write error: No space left on device`:**
  Your Docker virtual disk or physical hard drive is 100% full. Because it's full, Docker cannot install the VS Code Remote Server into the container.
  _Fix:_ Free up space on your physical hard drive. If you have space on your computer but Docker is still full, run `docker system prune -a --volumes` in your terminal to clear out unused Docker data.

- **`OCI runtime create failed: runc create failed... namespace path: lstat /proc/.../ns/net: no such file or directory` (Windows):**
  This happens when a Linux namespace (which Docker uses for networking) gets corrupted inside the WSL 2 VM (often due to computer sleep or unclean shutdown).
  _Fix:_ Open PowerShell as Administrator and run `wsl --shutdown`. Wait 10 seconds for it to fully stop, restart Docker Desktop, and try opening the dev container again.

#### Windows 10 Known Bugs

- If you get an error related to `docker-credential-wincred`, _restart your laptop_. This error seems to be from the fact that some docker executable are not added to the Windows PATH yet. If you reset and this still doesn't work, log into your Docker account (create one on the Docker website) with `docker login`. I doubt that would work, but I am logged in, so do that too just in case.

## Development

### Frontend

To develop in the frontend, you can run

```bash
yarn dev:client
```

Though this has some performance isuee, in that it takes a long time to compile and the changes are not reflected immediately. To try a slightly faster (but more experimental) method, try

```bash
yarn run dev-turbo:client
```

Note that this method will supposedly compile locally faster, but will have documented problems with styling. I've observed some quirks, just as the banner disappearing.

### Backend

The backend is built with KeystoneJS. For information on schema updates and database management, see [Database Management Guide](documentation/database_management.md).

### Discord Bot

The bot handles participant verification. For configuration and yearly setup, see [Discord Bot Setup Guide](documentation/discord_setup.md).
