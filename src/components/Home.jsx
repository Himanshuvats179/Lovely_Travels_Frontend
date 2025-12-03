import React, { useState } from 'react';
import "../css/home.css";
import HotelSearchBar from "./HotelSearchBar";
import CabSearchBar from "./CabSearchBar";

function Home() {

  const [activeTab, setActiveTab] = useState("hotel");

  return (
    <div className='home-container'>
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">MMT CLONE</div>
        <button className='login-btn'>
          Login / Create Account
        </button>
      </nav>

      {/* HERO SECTION */}
      <div className="hero-section">
        <h1>Plan your Perfect Trip</h1>
        <p>Book Hotels & Cabs at the best Price</p>

        <div className="search-tabs">

          {/* TAB BUTTONS */}
          <div className='tab-buttons'>
            <button
              className={activeTab === "hotel" ? "tab-active" : ""}
              onClick={() => setActiveTab("hotel")}
            >
              Hotels
            </button>

            <button
              className={activeTab === "cab" ? "tab-active" : ""}
              onClick={() => setActiveTab("cab")}
            >
              Cabs
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "hotel" && (
            <div id="hotel-search">
              <HotelSearchBar />
            </div>
          )}

          {activeTab === "cab" && (
            <div id="cab-search">
              <CabSearchBar />
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Home;
