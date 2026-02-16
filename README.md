# File Operation Dashboard

A simple dashboard for viewing and downloading file artifacts from multiple devices.

## Setup

```bash
npm install
npm run start
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

```bash
npm run start      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm test         # Run tests
```
##  Component Structure

* **`FileDashboard.tsx` -  Renders the UI based on props.
* **`useSelection.ts` - Encapsulates the core checkbox logic (indeterminate states, toggle all). 
* **`DataTable` - Encapsulates the data table Component.
* **`TableRow` - Render Row Component based on props.
* **`CheckBox` - Render CheckBox Component based on props.
* **`Modal` -  Render Report Modal to display what was downloaded vs. skipped.

## Features

- Select individual files or use the header checkbox to select all
- Download available files (scheduled files are automatically skipped)
- Shows a summary of what was downloaded vs. skipped
- Sticky table headers for easier navigation (Future Edits - Virtualization if dealing with large dataset)


## Tech Stack

- React + TypeScript
- Vite
- Jest + React Testing Library
