# Potential improvements wishlist

> [!NOTE]
> _Given that the project is mainly for learning purposes, these are just my broad ideas that I may or may not incorporate in the future_.

## Styling / UI / UX:

- [ ] <mark>Light Mode / Dark Mode</mark>
- [ ] <mark>UI Styling mimicking [neobrutalism](https://www.neobrutalism.dev/)</mark>
- [ ] Double check and improve ARIA functionality.
- [ ] Include sound effects triggered when interacting with the application.
- [ ] Investigate to learn about [React Server Components](https://react.dev/reference/rsc/server-components) and [React Compiler](https://react.dev/learn/react-compiler)

## Features / Functionality :

- [ ] Feature to render latex expressions
- [ ] Feature to open plain text files to read latex expressions and perform basic calculations.
- [ ] A "Solve for X" feature. This may also tie in or branch off to a basic linear algrebra solver.
- [ ] Plot simple graphs using any of the following: [plotly.js](https://plotly.com/javascript/) (preferred), Recharts, D3.js, chart.js
- [ ] Handle how to respond to input when the text area element is highlighted (text cursor has a different `selectionStart` and `selectionEnd` value.) for the following scenarios
  - [ ] number input form the user
  - [ ] `Backspace` key (delete key for Mac)
  - [ ] `Delete` key

## Development Tasks :

- [ ] Have a dedicated web-page to serve as an introduction and documentation guide for the project. Preferrably the use [Astro.js](https://astro.build/) or [Starlight](https://starlight.astro.build/) (by Astro) as a frontend framework, and host for free on github.
- [ ] Have a way to determine on the renderer-side whether an app is running on dev-mode. Likely pass the `is.dev` from `@electron-toolkit/utils` over IPC. Can be useful for only showing logs when in dev-mode.
- [ ] Set up the Electron IPC workflow that I stumbled on while working on [template-electron-forge-vite-react-ts](https://github.com/julillermo/template-electron-forge-vite-react-ts)
- [ ] <mark>Test cases using Vitest and Stories/Storybook.</mark>
- [ ] Connect to an external or system executable such as GNUplot or personally made compiled binaries for additional functionality. Currently leaning towards either C++ or Haskell.
- [ ] Include an autoupdater ([AppImageUpdate](https://github.com/AppImageCommunity/AppImageUpdate), [electron-build autoupdater](https://www.electron.build/auto-update))
- [ ] <mark>General development flow for packaging to Windows, Mac, and Linux. (prefer to distribute via [flathub](https://flathub.org/))</mark>
  - [ ] Code signing for application distribution.
- [ ] Have a CI/CD
  - [ ] Automatically run the tests and bump the version.
  - [ ] Code signing for application distribution.
- [ ] Make licenses of packages I've depended on accessible to the user
  - [ ] Create a Node script to automatically list direct and indirect dependency licenses using `pnpm licenses list --json > licenses.json`. The script should then copy out all available licenses into a `licences` folder.
  - [ ] Create a dedicated window for visually displaying the package licenses and making them accessible to the user.
    - [ ] Likely have a table or an accordion list
    - [ ] If I want to make the list searchable, I'd prefer to use SQLite \[[1](https://sqlite.org/index.html)] \[[2](https://www.delftstack.com/howto/sqlite/electron-sqlite/)] to facilitate the storage and search
