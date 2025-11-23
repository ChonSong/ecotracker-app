# EcoTracker App

A React Native application (Expo) to track your eco-friendly activities and calculate your carbon footprint reduction.

## Features

- **Dashboard**: View your total carbon saved and a chart of your activity over the last 7 days.
- **Log Activity**: Record eco-friendly actions (Transport, Diet, Energy, Recycling).
- **History**: View and manage your past logs.

## Project Structure

- `src/components`: Reusable UI components.
- `src/context`: State management (AppContext) using React Context and AsyncStorage.
- `src/navigation`: Navigation setup (Bottom Tabs).
- `src/screens`: Main application screens (Dashboard, Log, History).
- `src/types`: TypeScript interfaces.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the app:
    ```bash
    npx expo start
    ```

## Technologies

- Expo
- React Native
- React Native Paper (UI)
- React Navigation (Routing)
- React Native Chart Kit (Visualization)
- Async Storage (Persistence)
