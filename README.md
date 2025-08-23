# some Calculator

A simple calculator application meant for personal learning of [Electron.js](https://www.electronjs.org/). This project builds on the starting point provided by [electron-vite](https://electron-vite.org/).

The project is intended to gradually gain more features over time to facilitate my learning of Node, Electron, and general software development.

For documentation files, kindly refer to:

- [Changelog](/docs/changelog/CHANGELOG-v0.md)
- [Improvements wishlist](/docs/improvements-wishlist.md)
- [Known issues](/docs/known-issues.md)

To build or run the application from source, refer to:

- [Running the application in development-mode from source](#running-the-application-in-development-from-source)
- [Building the application for your local machine](#building-the-application)

## Added features as of latest v0.2.0

- [x] Working functionality for the 4 basic math operations computed on chromium front-end only
- [x] Respond to keyboard inputs.
  - `0-9` input number values (both keyboard number pad and top row of keyboard)
  - `Backspace` (delete on Mac) - backward delete
  - `Delete` - forward delete
  - `c` - clear the display
  - `+` for add
  - `-` for subtract
  - `*` for multiply
  - `/` for divide
  - `Enter` to evaluate expression (same action as the on-screen `=` button)
  - `←` to move cursor leftward
  - `→` to move cursor rightward
- [x] Honor text cursor placement:
  - Navigate the cursor position via the `<` and `>` key pad grid buttons.
  - `Backspace` (Delete on Mac) - delete character on the left of the cursor
  - `Delete` - delete character on the right of the cursor
  - `0-9` keys - number values get inserted at the text cursor position.

## Planned updates for v0.3.0

- [ ] UI Styling mimicking [neobrutalism](https://www.neobrutalism.dev/)
- [ ] Light Mode / Dark Mode
- [ ] Test cases using Vitest and Stories/Storybook

## Planned updates for v0.4.0

- [ ] General development flow for packaging to Windows, Mac, and Linux. (prefer to distribute via [flathub](https://flathub.org/))
- [ ] Make licenses of packages I've depended on accessible to the user
  - [ ] Create a Node script to automatically list direct and indirect dependency licenses using `pnpm licenses list --json > licenses.json`. The script should then copy out all available licenses into a `licences` folder.
  - [ ] Create a dedicated window for visually displaying the package licenses and making them accessible to the user.
    - [ ] Likely have a table or an accordion list
    - [ ] If I want to make the list searchable, I'd prefer to use SQLite \[[1](https://sqlite.org/index.html)] \[[2](https://www.delftstack.com/howto/sqlite/electron-sqlite/)] to facilitate the storage and search

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
