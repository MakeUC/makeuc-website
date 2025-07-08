# Rai's Monkeypatched Developemnt Setup Guide
note, this is outdated a bit since some issues with workarounds listed here have been fixed! (ex, discord env variable requirement)

Basically, I'll detail how I set up the repository (only the client for now, but will update) in painful details so hopefully you can get the site ready for local development. This is completely objective and based on my personal experience setting up the site, so things might change, and other debugging stuff might and will get added as I get more user stories in.

## Setup

### Environment Variables

The backend of this project requires usage of environmental variables to access the database and the Discord bot. Make sure to contact with your Technical Lead to obtain these credentials if your task is to mess with the backend in any capacity.

Specifically, after obtaining these credentials, navigate to `/.devcontainer` and create a file called `.env.local`. Then, copy the fields from `.env.local.default` to this new file and fill in the missing credentials.

### GitHub Codespaces

If you have free GitHub pro from the Student benefits (sign up for it, I highly recommend, you get a bunch of free stuff), you can use codespaces to save the massive hassle of setting multiple things up in the local environment.

GitHub Codespaces comes with a Linux environment preinstalled, plus built-in support for devcontainers. If you're interested in how Codespaces work, you can read the documenations [here](https://docs.github.com/en/codespaces/overview).

You should open a new Codespace from the `main` branch. On creation, GitHub will automatically detect that this project is using a devcontainer, and automatically perform the necessary steps to set the project up.

**Important**: After the Codespace was set up for me, I noticed some problems with installing packages that was ignored. Just to be sure, after your Codespace is configured, run `yarn install` in the command line.

### Local Development

#### Common Setup Steps

1. Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed (or Rancher Desktop, if you managed to get it working with VSCode). Also have [yarn](https://yarnpkg.com/getting-started/install) installed.
2. Clone the repository and open the repository in VSCode.
3. Make sure that you have the `Dev Container` extension installed in VSCode. Then open the command pallet for VSCode with `F1` or `CTRL+SHIFT+P` and run `Dev Containers: Reopen in Container`.
4. Open the terminal inside VSCode (the one that is spawned from the container) and run `yarn install`.
5. Run the development command for whichever application you're using. `yarn dev` runs every single application in this monorepo, whereas `yarn dev:client` runs only the NextJS frontend, for example. The rule of thumb here is `dev:[file]`.

#### Push Hooks

To push, a pre-push hook is run. Inside this hook, `yarn build` is executed. To successfully push to the git repository while satisfying the pre-push hook, first have the server started with `yarn dev:server` before running `git push`.

#### General Known Bug

If the build fails, particularly on the client, a cached build may have been used and this cache is not being invalidated (especially if no changes to the server have been made). To invalidate said cached build, remove the `.next` folder in the client directory.

#### Windows 10 Known Bugs

- In the devcontainer setup, there is a command that is ran before container setup that *expects* a Linux environment (it is written in bash). This will fail the setup step for Windows users since Powershell cannot run bash commands. This command basically checks whether an `.env.local` already exist, and if not, create a copy of the `.env.local.default` and rename it to `.env.local`. One of the ways to monkeypatch this issue is to delete the `"initializeCommand"` field in the `/.devcontainer/.devcontainer.json`, and create the `.env.local` yourself and copy in the content of the `.env.local.default` file.

- If you get an error related to `docker-credential-wincred`, *restart your laptop*. This error seems to be from the fact that some docker executable are not added to the Windows PATH yet. If you reset and this still doesn't work, log into your Docker account (create one on the Docker website) with `docker login`. I doubt that would work, but I am logged in, so do that too just in case.

#### WSL Known Bugs

- Docker daemon not working. I've encountered this bug a while ago (like 2023) with Docker Desktop. Basically, Docker Desktop cannot tunnel to WSL and give it access to Docker. I believe Rancher Desktop plays nicer with WSL, so use that instead. Otherwise, look up how to tunnel Docker to WSL with Docker Desktop/Rancher Desktop. You can check whether Docker is accessible within WSL by running `docker --version` inside WSL and see if the command executes.

#### Linux Known Bugs

#### Mac Known Bugs

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

TBA

### Discord Bot

The bot is currently non-functional due to breaking changes from `discord-js`. Petition to change the bot to `discord.py`.
