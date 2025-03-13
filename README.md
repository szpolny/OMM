# Orbital Mod Manager (OMM)

Orbital Mod Manager (OMM) is a modern, feature-rich mod manager for **Kerbal
Space Program (KSP)**. Designed to enhance the modding experience, OMM acts as
an **overlay** to **CKAN**, complementing it with advanced features for managing
multiple Steam game instances and improving overall usability. OMM is not
intended to replace CKAN but to work on top of it, providing additional tools
and a more streamlined experience for players.

Built with **React** and **Tauri**, OMM delivers a lightweight, cross-platform,
and user-friendly interface for managing mods and game instances.

## 🚀 Features

- **CKAN Integration**: Full support for CKAN repositories, allowing you to
  browse, install, and manage mods with ease while leveraging CKAN's powerful
  backend.
- **Multiple Game Instance Management**: Effortlessly manage multiple Steam game
  instances, making it easier to switch between modded and vanilla setups.
- **Backup and Restore**: Easily back up and restore game instances, including
  mods and save files.
- **Custom Profiles**: Create and manage custom mod profiles for different
  playstyles or game setups.

## 🧩 Compatibility

OMM is designed to work seamlessly with CKAN, ensuring compatibility with the
vast library of mods available for Kerbal Space Program. It supports both Steam
and standalone installations of the game, making it a versatile tool for all KSP
players.

## 🗺️ Roadmap

- [ ] Management of multiple game instances/profiles
- [ ] CKAN Integration
- [ ] Enhanced mod profile management
- [ ] Improved backup and restore functionality
- [ ] Cross-platform enhancments

## 🛠️ Building

### Prerequisites

Before building the project, ensure you have the following installed:

- Rust: Install Rust and its toolchain by following the instructions at
  [rust-lang.org](https://www.rust-lang.org/).
- Node.js: Install Node.js (nvm recommended:
  [Linux/macOS](https://github.com/nvm-sh/nvm),
  [Windows](https://github.com/coreybutler/nvm-windows))
- pnpm: Install pnpm using instructions at [pnpm.io](https://pnpm.io/)

### How to start the development server?

If you want to work on this repo, you probably want to run the development
server with hot-reload.

1. **Install Dependencies:** Navigate to your project directory and install the
   required dependencies using pnpm:
   ```zsh
   pnpm install
   ```
2. **Run Development Server:** Use the
   [Tauri CLI](https://v2.tauri.app/reference/cli/) with pnpm to start the
   development server:
   ```zsh
   pnpm tauri dev
   ```

### Steps to build

1. **Install Dependencies:** (if you haven't done it yet) Navigate to your
   project directory and install the required dependencies using pnpm:
   ```zsh
   pnpm install
   ```
2. **Build:** Build the whole project (frontend and backend):
   ```zsh
   pnpm tauri build
   ```

## 📄 License

This project is licensed under the MIT License. See the
[LICENSE.md](https://github.com/szpolny/OMM/blob/master/LICENSE.md) file for
details.
