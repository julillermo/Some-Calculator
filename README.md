# some Calculator

A simple calculator application meant for personal learning of [Electron.js](https://www.electronjs.org/). This project builds on the starting point provided by [electron-vite](https://electron-vite.org/).

The project is intended to gradually gain more features over time to facilitate my learning of Node and Electron.

For documentation files, kindly refer to:

- [Changelog](/docs/changelog/CHANGELOG-v0.md)
- [Improvements wishlist doc](/docs/improvements-wishlist.md)
- [Known issues](/docs/known-issues.md)

To build or run the application from source, refer to:

- [Running the application in development from source](#running-the-application-in-development-from-source)
- [Building the application](#building-the-application)

## Features as of latest v0.1.0

- [x] Base calculator with working numpad input and display.

## Planned updates for v0.2.0-dev

- [ ] Working functionality for the 4 basic math operations computed on chromium front-end only
- [x] Respond to keyboard inputs.
- [ ] Honor text cursor placement:
  - [ ] Navigate the cursor position via the `<` and `>` key pad grid buttons.
  - [x] `Backspace` (Delete on Mac) - delete character on the left of the cursor
  - [ ] `Delete` - delete character on the right of the cursor
  - [ ] `0-9` keys - number values get inserted at the text cursor position.

## Running the application in development from source:

Copy the repository to your local computer:

```bash
git clone https://github.com/julillermo/Some-Calculator
```

Navigate to the folder and install the dependencies:

```bash
# using npm
npm install

# using pnpm
pnpm install
```

Run the dev server with the following commands:

```bash
# using npm
npm run dev

# using pnpm
pnpm run dev
```

## Building the application:

Copy the repository to your local computer:

```bash
git clone https://github.com/julillermo/Some-Calculator
```

Navigate to the folder and install the dependencies:

```bash
# using npm
npm install

# using pnpm
pnpm install
```

Build the application with the following command

```bash
# using npm
npm run build:linux

# using pnpm
pnpm run build:linux
```

- Only the linux AppImage has been tested in my development at the moment
- You're welcome to try the build targets by modifying the [electron-builder config file](/electron.vite.config.ts) before running the build scripts.
