import React, { useState, useEffect } from "react";
import TopMenu from "../components/topmenu/TopMenu";
import LeftMenu from "../components/leftmenu/LeftMenu";
import Home from "./Home";
import "./HomeWrapper.scss";

const HomeWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleLeftMenu = () => {
    setShowLeftMenu(!showLeftMenu);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-wrapper">
      {/* Top Menu */}
      <TopMenu onMenuToggle={toggleLeftMenu} />

      {/* Left Menu (desktop) */}
      {!isMobile && <LeftMenu />}

      {/* Left Menu Overlay (mobile) */}
      {isMobile && showLeftMenu && (
        <div 
          className="home-wrapper__overlay"
          onClick={() => setShowLeftMenu(false)}
        />
      )}

      {/* Left Menu Content (mobile) */}
      {isMobile && (
        <div 
          className={`home-wrapper__left-menu-mobile ${
            showLeftMenu ? "home-wrapper__left-menu-mobile--open" : ""
          }`}
        >
          <LeftMenu onClose={() => setShowLeftMenu(false)} />
        </div>
      )}

      {/* Main Content */}
      <div 
        className={`home-wrapper__content ${
          !isMobile ? "home-wrapper__content--with-left-menu" : ""
        }`}
      >
        <Home />
      </div>

      {/* Back to Top Button */}
      <button
        className={`home-wrapper__back-to-top ${
          showBackToTop ? "home-wrapper__back-to-top--visible" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        ↑
      </button>

      {/* Loading indicator */}
      {/* <div className="home-wrapper__loading">
        <div className="home-wrapper__loading-spinner"></div>
      </div> */}
    </div>
  );
};

export default HomeWrapper;