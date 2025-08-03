# some Calculator

A simple calculator application meant for personal learning of [Electron.js](https://www.electronjs.org/). This project buils on the starting point provided by [electron-vite](https://electron-vite.org/).

The project is intended to gradually gain more features over time to facilitate my learning of Node and Electron.

To build or running the application from source, refer to:

- [Running the application in development from source](#running-the-application-in-development-from-source)
- [Building the application](#building-the-application)

## Features as of latest v0.1.0

- [x] Base calculator with working numpad input and display.

## Additions expected for v0.2.0

- [ ] Working functionality for the 4 basic math operations computed on chromium front-end only
- [ ] Respond to keyboard number inputs.
- [ ] Navigate the cursor position

## Potential improvements wishlist

_Given that the project is mainly for learning purposes, these are just my broad ideas that I can potentially incorporate in the future_

### Styling / UI :

- [ ] Light Mode / Dark Mode
- [ ] UI Styling mimicking [neobrutalism](https://www.neobrutalism.dev/)
- [ ] Double check and improve ARIA functionality.

### Features / Functionality :

- [ ] Feature to render latex expressions
- [ ] Feature to open plain text files to read latex expressions and perform basic calculations.
- [ ] A "Solve for X" feature. This may also tie in or branch off to a basic linear algrebra solver.
- [ ] Plot simple graphs using any of the following: [plotly.js](https://plotly.com/javascript/) (preferred), Recharts, D3.js, chart.js

### Development Tasks :

- [ ] Set up the Electron IPC workflow that I stumbled on while working on [template-electron-forge-vite-react-ts](https://github.com/julillermo/template-electron-forge-vite-react-ts)
- [ ] Test cases using Vitest and Stories/Storybook.
- [ ] Cover error scenarios.
- [ ] Connect to an external or system executable such as GNUplot or personally made compiled binaries for additional functionality.
- [ ] Include an autoupdater ([AppImageUpdate](https://github.com/AppImageCommunity/AppImageUpdate), [electron-build autoupdater](https://www.electron.build/auto-update))
- [ ] General development flow for packaging to Windows, Mac, and Linux. (prefer to distribute via [flathub](https://flathub.org/))

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
