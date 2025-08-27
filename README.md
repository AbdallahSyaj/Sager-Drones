Drone Monitoring Dashboard
Overview

This project is a real-time Drone Monitoring Dashboard designed to track drones’ locations, authorization status, flight data, and altitudes. It includes features like PDF report export, visual analytics via charts, and synchronized real-time updates between the map and dashboard.

The goal was to create a full-stack, interactive, and visually appealing dashboard that supports live updates and persistent state management for drones.

Technologies Used

Frontend:

-React.js – for building the interactive UI.
-Recharts – for rendering dynamic charts (Pie, Bar, Line).
-Mapbox GL JS – for interactive map visualization.
-Redux Toolkit – for state management, keeping drone data consistent across components.
-Socket.IO client – for real-time updates from the server.
-jsPDF – for generating PDF reports directly from the dashboard.
-Lucide-react icons – for dashboard icons.

Backend (assumed / referenced):
-Node.js & Socket.IO server – streams real-time drone data as GeoJSON features.

Other Tools:
-VS Code – code editor.
-TailwindCSS
-AI Tools (ChatGPT / GPT) – for guidance, code structuring, and problem-solving during development.

Development Process (Step by Step)

1. Planning & Requirements

-Defined the project goal: real-time monitoring of drones with a synchronized map and dashboard.
-Decided on core features:
-Real-time drone updates.
-Authorization status.
-Altitude history.
-PDF export of current dashboard data.
-Charts for visualization (Pie, Bar, Line).
-Interactive map with drone paths.

2. Setting up the Project

-Created a React project using create-react-app (or Vite).
-Installed required dependencies:
-npm install react-redux @reduxjs/toolkit recharts react-map-gl socket.io-client jspdf lucide-react
-Set up Redux Toolkit store to manage drone data centrally, ensuring all components access the same consistent state.

3. Designing the Redux Store

-Created dronesSlice.js to:
-Store drones by their unique serial.
-Keep the selected drone.
-Upsert new drone data from server messages.
-Implemented selectors for:
-All drones.
-Selected drone.
-Unauthorized drone count.

4. Integrating the Map

-Used Mapbox GL to render drone locations and flight paths.
-Connected the map to Redux so that hovering or selecting a drone highlights it and centers the map.
-Ensured drone paths are preserved and updated in real-time.

5. Building the Dashboard

-Created DroneDashboard component to show:
-Summary cards: Total, Authorized, Unauthorized, Active drones.

Charts:

-Pie Chart for authorization.
-Bar Chart for drone altitudes.
-Line Chart for altitude history.
-Active drones table with detailed info.
-Ensured the data is synchronized with Redux store, so map and dashboard are consistent.

6. Real-Time Updates

-Integrated Socket.IO to receive live drone updates.
-Updated Redux state on every new feature from the server.
-Maintained altitude history for line charts and persistent paths for map display.

7. PDF Report Generation

-Added jsPDF support to export current dashboard data.
-Report includes:
-Summary stats.
-Drone table with registration, altitude, and status.

8. State Persistence

-Ensured the dashboard does not lose data on page refresh or tab switch by storing all drone data in Redux.
-Map and dashboard always reflect the current Redux state.

9. Styling & UX

-Applied dark theme with gradients for a modern look.
-Cards, charts, and tables designed to be readable and visually appealing.
-Used icons for quick status recognition.
-AI and External Resources Usage

ChatGPT / GPT-4:

-Assisted in code refactoring.
-Suggested Redux patterns for real-time state synchronization.
-Helped design charts, PDF export, and layout improvements.

Official Docs:

-React.js
-Redux Toolkit
-Recharts
-Mapbox GL JS
-Socket.IO
-jsPDF

How to Run

1. Clone the repository:

git clone [<repo-url>](https://github.com/AbdallahSyaj/Sager-Drones.git)

2. run server

A) cd Sager-Task-Backend

B) Install dependencies:
npm install

C) Start the development server:
npm start

3. run FrontEnd by:

A) cd Sager-Task-FE

B) Install dependencies:
npm install

C) Start the development server:
npm run dev (vite)

------------------------------------------------------------

