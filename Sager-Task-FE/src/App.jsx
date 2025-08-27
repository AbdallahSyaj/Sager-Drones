import React, { useState } from "react";
import Layout from "./Layout/Layout";
import DroneDashboard from "./Dashboard/DroneDashboard";
import MapView from "./components/MapView";
import DroneList from "./components/DroneList";
import Counter from "./components/Counter";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DroneDashboard />;
      case "map":
        return (
          <div className="app">
            <DroneList />
            <div style={{ position: "relative" }}>
              <MapView />
              <Counter />
            </div>
          </div>
        );
      default:
        return <DroneDashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={handlePageChange}>
      {renderContent()}
    </Layout>
  );
}
