import React, { useState, useEffect } from "react";
import "./Layout.css";


import logoImg from "../assets/sager_log.svg";
import fullscreenIcon from "../assets/capture-svgrepo-com.svg";
import languageIcon from "../assets/language-svgrepo-com.svg";
import bellIcon from "../assets/bell.svg";
import dashboardIcon from "../assets/dashboard-svgrepo-com-2.svg";
import mapIcon from "../assets/location-svgrepo-com-2.svg";

const Layout = ({ children, currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when resizing window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLayoutSidebarClick = (item) => {
    onPageChange(item);
    if (isMobileMenuOpen) closeMobileMenu();
  };

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".burger")
      ) {
        closeMobileMenu();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoImg} alt="Sager Logo" className="logo" />
        </div>

        <button
          className={`burger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <div className="desktop-menu">
          <button
            className="nav-button"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
          >
            <img src={fullscreenIcon} alt="Fullscreen" className="nav-icon" />
          </button>

          <button className="nav-button">
            <img src={languageIcon} alt="Language" className="nav-icon" />
          </button>

          <div className="notifications-wrapper">
            <button className="nav-button">
              <img src={bellIcon} alt="Notifications" className="nav-icon" />
            </button>
            <span className="notification-badge">8</span>
          </div>

          <div className="user-info">
            <p className="user-greeting">
              Hello, <span className="user-name">Mohamed Omar</span>
            </p>
            <p className="user-role">Technical Support</p>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "show" : ""}`}>
          <div className="mobile-menu-content">
            <button className="mobile-menu-item">
              <img src={fullscreenIcon} alt="Fullscreen" className="nav-icon" />
              <span>Fullscreen</span>
            </button>

            <button className="mobile-menu-item">
              <img src={languageIcon} alt="Language" className="nav-icon" />
              <span>Language</span>
            </button>

            <button className="mobile-menu-item mobile-notifications">
              <div className="mobile-menu-item-content">
                <img src={bellIcon} alt="Notifications" className="nav-icon" />
                <span>Notifications</span>
                <span className="notification-badge">8</span>
              </div>
            </button>

            <div className="mobile-user-info">
              <p className="user-greeting">
                Hello, <span className="user-name">Mohamed Omar</span>
              </p>
              <p className="user-role">Technical Support</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="layout-content">
        <aside className="LayoutSidebar">
          <button
            className={`LayoutSidebar-btn ${
              currentPage === "dashboard" ? "active-LayoutSidebar" : ""
            }`}
            onClick={() => handleLayoutSidebarClick("dashboard")}
          >
            <img
              src={dashboardIcon}
              alt="Dashboard"
              className="LayoutSidebar-icon"
            />
            <span className="LayoutSidebar-text">Dashboard</span>
          </button>

          <button
            className={`LayoutSidebar-btn ${
              currentPage === "map" ? "active-LayoutSidebar" : ""
            }`}
            onClick={() => handleLayoutSidebarClick("map")}
          >
            <img src={mapIcon} alt="Map" className="LayoutSidebar-icon" />
            <span className="LayoutSidebar-text">Map</span>
          </button>
        </aside>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
