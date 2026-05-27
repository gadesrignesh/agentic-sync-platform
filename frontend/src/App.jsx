import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import AIInsightsPage from "./pages/AIInsightsPage";

import WaveformSync from "./pages/WaveformSync";

import Analytics from "./pages/Analytics";

import EventsLog from "./pages/EventsLog";

import Simulation from "./pages/Simulation";

import Settings from "./pages/Settings";


function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/dashboard" />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/ai-insights"
        element={<AIInsightsPage />}
      />

      <Route
        path="/waveform-sync"
        element={<WaveformSync />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />

      <Route
        path="/events-log"
        element={<EventsLog />}
      />

      <Route
        path="/simulation"
        element={<Simulation />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

    </Routes>

  );

}

export default App;