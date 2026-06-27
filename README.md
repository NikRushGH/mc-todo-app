# Game Task Tracker

A clean, glassmorphism-styled application designed to track in-game goals, builds, and exact locations across any open-world, survival, or RPG game.

<img width="800" alt="App Screenshot" src="https://github.com/user-attachments/assets/39d1732a-dcdf-4050-8116-eec39df021af" />

## Technologies Used
* **Framework:** React
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** HeroUI
* **Build Tool:** Vite

## Core Features

### Task Management
* Create, complete, and delete tasks easily.
* **Inline Editing:** Update task text, coordinates, and categories directly in the list without opening separate modal windows.
* Interactive onboarding tutorial presented as default tasks.

### Gamer-Focused Utilities
* **Coordinate Tracker:** Save exact X, Y, and Z coordinates to never lose a base, quest location, or hidden stash again.
* **Category System:** Color-coded task categories created for gameplay (Resources, Building, Technology, Magic, Exploration, etc.).
* Dropdown filtering to easily sort tasks by their category.

### UI & UX Design
* "Glassmorphism" interface with dynamic blur and translucent layers.
* Optically aligned metadata chips and action buttons.
* Fixed-height layout with a custom scrollbar and a smooth bottom fade-out mask to prevent layout shifts.

## Planned Features
* **PWA Conversion:** Turn the application into a fully installable Progressive Web App (PWA).
* **Game-Specific Integrations:** Connect the app directly to game clients, starting with a custom Minecraft Java mod for live task synchronization (developed in a separate repository).
* **Drag and Drop:** Functionality for easy task reordering.
* **Customization:** User-created categories and custom color selection.