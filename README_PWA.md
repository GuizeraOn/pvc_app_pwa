# 📱 Visión Clara PWA - Documentation

The implementation of the Visión Clara PWA is complete, following the premium, mobile-first technical specifications.

## 🚀 Tech Stack
- **Framework**: React + Vite (Optimized for speed and PWA)
- **Styling**: TailwindCSS 4 (Dark Theme, Glassmorphism)
- **Animations**: Framer Motion (Page transitions, UI micro-interactions)
- **Offline Logic**: Vite PWA Plugin (Service Workers & Manifest)
- **Persistence**: Browser LocalStorage (No Backend required)

## 🏗️ Project Structure
- `src/App.jsx`: Main router with page transitions and Auth guards.
- `src/pages/Login.jsx`: Placebo auth screen with simulated server check (1.5s).
- `src/pages/Dashboard.jsx`: Central hub with video module and primary navigation.
- `src/pages/ModuleDetail.jsx`: Dynamic view for Gamma Iframe content with seamless tabs.
- `src/pages/Tracker.jsx`: Gamified 30-day habit tracker with persistent progress.
- `src/components/PwaInstallPrompt.jsx`: Custom bottom sheet for A2HS (Add to Home Screen) with OS-specific instructions.

## 🛠️ Key Features Details

### 1. Placebo Login
The "Acceso Exclusivo" screen creates a sense of security and exclusivity. It simulates a server verification process with a spinner before redirecting to the dashboard.

### 2. Premium UI/UX
- **Dark Mode**: Deep Slate background with Emerald accents.
- **Glassmorphism**: Subtle backdrop filters and blurred card borders for a native app feel.
- **Micro-animations**: Smooth entry transitions and button feedback using Framer Motion.
- **Mobile-first**: Layout perfectly contained in the `max-w-md` container.

### 3. Progressive Web App (PWA)
- **Offline support**: Static assets are cached for instant loading.
- **A2HS Integration**:
  - **Android**: Captured `beforeinstallprompt` event for native install experience.
  - **iOS**: Visual guide for manual "Add to Home Screen" via Safari Share icon.
- **Manifest**: Correctly configured with high-quality icons and standalone display mode.

### 4. 30-Day Tracker
Gamified progress marking with persistent state stored in `localStorage`. Includes motivational messages that change based on progress.

## 🏁 How to Run
```bash
npm install --legacy-peer-deps
npm run dev
```
To test PWA features locally, use:
```bash
npm run build
npm run preview
```
