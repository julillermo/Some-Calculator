# Potential improvements wishlist

_Given that the project is mainly for learning purposes, these are just my broad ideas that I can potentially incorporate in the future_

## Styling / UI :

- [ ] Light Mode / Dark Mode
- [ ] UI Styling mimicking [neobrutalism](https://www.neobrutalism.dev/)
- [ ] Double check and improve ARIA functionality.

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

- [ ] Set up the Electron IPC workflow that I stumbled on while working on [template-electron-forge-vite-react-ts](https://github.com/julillermo/template-electron-forge-vite-react-ts)
- [ ] Test cases using Vitest and Stories/Storybook.
- [ ] Cover error scenarios.
- [ ] Connect to an external or system executable such as GNUplot or personally made compiled binaries for additional functionality.
- [ ] Include an autoupdater ([AppImageUpdate](https://github.com/AppImageCommunity/AppImageUpdate), [electron-build autoupdater](https://www.electron.build/auto-update))
- [ ] General development flow for packaging to Windows, Mac, and Linux. (prefer to distribute via [flathub](https://flathub.org/))
