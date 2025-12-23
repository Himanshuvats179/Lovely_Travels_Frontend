// src/Dashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const navLinks = ["Home", "Bookings", "Support"];

const trendingDestinations = [
  {
    id: 1,
    city: "Goa",
    country: "India",
    price: "₹2,799",
    tag: "Beach • Nightlife",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    city: "Manali",
    country: "India",
    price: "₹3,499",
    tag: "Hills • Adventure",
    image:
      "https://images.pexels.com/photos/3137670/pexels-photo-3137670.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    city: "Jaipur",
    country: "India",
    price: "₹2,399",
    tag: "Heritage • City",
    image:
      "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    city: "Bangkok",
    country: "Thailand",
    price: "₹5,299",
    tag: "City • Nightlife",
    image:
      "https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  // ================================
  // STATE MANAGEMENT FOR BOOKING UI
  // ================================
  const [activeService, setActiveService] = useState("Hotels");
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [rooms, setRooms] = useState("1 Room");

  // =============================
  // LOGOUT FUNCTION
  // =============================
  // const handleLogout = async () => {
  //   const accessToken = localStorage.getItem("accessToken");

  //   // If no token, just clear everything
  //   if (!accessToken) {
  //     localStorage.clear();
  //     sessionStorage.clear();
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     // Sending access token to backend logout API
  //     await fetch("http://localhost:8080/user/logout", {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${accessToken}`
  //       }
  //     });
  //   } catch (err) {
  //     console.log("Logout request failed (Ignoring...)", err);
  //   }

  //   // Remove all tokens from frontend
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("userId");
  //   sessionStorage.clear();

  //   // Redirect user to login
  //   navigate("/login");
  // };

  // // =============================
  // // NAVIGATION SECTIONS
  // // =============================
  // const handleNavClick = (link) => {
  //   if (link === "Home") navigate("/");
  //   if (link === "Bookings") navigate("/bookings");
  //   if (link === "Support") navigate("/support");
  // };


const handleLogout = async () => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    if (accessToken) {
      await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } catch (err) {
    console.log("Logout request failed (ignored)", err);
  }

  // clear frontend state
  localStorage.clear();
  sessionStorage.clear();

  // 🔥 IMPORTANT FIX
  window.location.replace("/");
};










  // =============================
  // SEARCH HANDLER FOR HOTELS / CABS
  // =============================
  const handleSearch = () => {
    if (activeService === "Hotels") {
      navigate("/hotels", {
        state: { location, checkIn, checkOut, guests, rooms },
      });
    } else {
      navigate("/cabs", {
        state: { location, date: checkIn, guests },
      });
    }
  };

  return (
    <div className="app-root">

      {/* ================================
          LEFT SIDEBAR
         ================================ */}
      <aside className="sidebar">

        {/* LOGO SECTION */}
        <div className="sidebar-logo">
          <div className="logo-icon">H</div>
          <div className="logo-text">
            <span className="logo-title">Lovely Travels</span>
            <span className="logo-subtitle"></span>
          </div>
        </div>

        {/* MAIN SIDEBAR LINKS */}
        <div className="sidebar-section">
          <p className="sidebar-section-title">User Dashboard</p>

          <button
            className="sidebar-link sidebar-link-active"
            onClick={() => navigate("/")}
          >
            <span className="sidebar-dot" />
            Overview
          </button>

          <button className="sidebar-link" onClick={() => navigate("/hotels")}>
            Hotels
          </button>

          <button className="sidebar-link" onClick={() => navigate("/cabs")}>
            Cabs
          </button>

          <button className="sidebar-link" onClick={() => navigate("/profile")}>
            Profile
          </button>
        </div>

        {/* OWNER SECTION */}
        <div className="sidebar-section">
          <p className="sidebar-section-title">Owner Panel</p>

          <button
            className="sidebar-cta"
            onClick={() => navigate("/register-hotel")}
          >
            Register Hotel
          </button>

          <button
            className="sidebar-cta secondary"
            onClick={() => navigate("/register-cab")}
          >
            Register Cab
          </button>
        </div>

        {/* FOOTER HELP SECTION */}
        <div className="sidebar-footer">
          <p className="sidebar-footer-title">Need Help?</p>
          <p className="sidebar-footer-text">24x7 support available</p>

          <button
            className="sidebar-help-btn"
            onClick={() => navigate("/support")}
          >
            Chat with us
          </button>
        </div>
      </aside>

      {/* ================================
          MAIN AREA (RIGHT SIDE)
         ================================ */}
      <div className="main-area">

        {/* TOP BAR */}
        <header className="topbar">

          {/* TOPBAR NAV BUTTONS */}
          <nav className="topbar-left">
          
            {navLinks.map((link) => (
              <button
                key={link}
                className={`topbar-link ${link === "Home" ? "topbar-link-active" : ""}`}
                onClick={() => handleNavClick(link)}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* USER INFO + LOGOUT BUTTON */}
          <div className="topbar-right">
            <div className="user-info">
              <div className="user-avatar">J</div>
              <div>
                <p className="user-name">User</p>
                <p className="user-subtitle">Gold Member</p>
              </div>
            </div>

            {/* LOGOUT BUTTON ATTACHED HERE */}
            <button className="topbar-btn ghost" onClick={handleLogout}>
              Logout
            </button>

            <button className="topbar-btn primary">Register</button>
          </div>
        </header>

        {/* ================================
            MAIN CONTENT AREA
           ================================ */}
        <main className="content">

          {/* BOOKING CARD SECTION */}
          <section className="booking-row">
            <div className="booking-card">

              {/* CARD HEADER */}
              <div className="booking-card-header">
                <h2 className="booking-title">Book Your Stay or Ride</h2>
                <p className="booking-subtitle">
                  Find the best {activeService.toLowerCase()} at exclusive prices.
                </p>

                {/* SWITCH TABS BETWEEN HOTELS/CABS */}
                <div className="booking-toggle">
                  <button
                    className={`toggle-pill ${activeService === "Hotels" ? "active" : ""}`}
                    onClick={() => setActiveService("Hotels")}
                  >
                    Hotels
                  </button>

                  <button
                    className={`toggle-pill ${activeService === "Cabs" ? "active" : ""}`}
                    onClick={() => setActiveService("Cabs")}
                  >
                    Cabs
                  </button>
                </div>
              </div>

              {/* BOOKING FORM */}
              <div className="booking-form">

                {/* FIRST ROW */}
                <div className="form-row">
                  <div className="form-field">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder={
                        activeService === "Hotels"
                          ? "City, landmark, or hotel name"
                          : "Pickup city or airport"
                      }
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>{activeService === "Hotels" ? "Check-in" : "Date"}</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>

                  {activeService === "Hotels" && (
                    <div className="form-field">
                      <label>Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* SECOND ROW */}
                <div className="form-row">

                  <div className="form-field">
                    <label>Guests</label>
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>

                  {activeService === "Hotels" && (
                    <div className="form-field">
                      <label>Rooms</label>
                      <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                        <option>1 Room</option>
                        <option>2 Rooms</option>
                        <option>3 Rooms</option>
                      </select>
                    </div>
                  )}

                  <div className="form-field form-field-button">
                    <button className="search-btn" onClick={handleSearch}>
                      {activeService === "Hotels" ? "Search Hotels" : "Search Cabs"}
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* WHY BOOK WITH US SECTION */}
            <aside className="why-card">
              <h3>Why book with us?</h3>
              <ul className="why-list">

                <li>
                  <span className="why-icon">💸</span>
                  <div>
                    <p className="why-title">Best Prices Guaranteed</p>
                    <p className="why-text">Get exclusive app-only deals and offers.</p>
                  </div>
                </li>

                <li>
                  <span className="why-icon">✅</span>
                  <div>
                    <p className="why-title">Verified Stays</p>
                    <p className="why-text">Every property is quality checked before listing.</p>
                  </div>
                </li>

                <li>
                  <span className="why-icon">🕐</span>
                  <div>
                    <p className="why-title">24x7 Support</p>
                    <p className="why-text">We’re here for you anytime, anywhere.</p>
                  </div>
                </li>

              </ul>
            </aside>
          </section>

          {/* TRENDING DESTINATIONS */}
          <section className="trending-section">
            <div className="trending-head">

              <div>
                <h3 className="trending-title">Trending Destinations</h3>
                <p className="trending-subtitle">
                  Popular places people are booking right now.
                </p>
              </div>

              <button className="view-all-btn" onClick={() => navigate("/hotels")}>
                View all
              </button>
            </div>

            <div className="trending-list">
              {trendingDestinations.map((item) => (
                <article key={item.id} className="destination-card">

                  <div className="destination-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.city}
                      className="destination-image"
                    />
                    <span className="destination-badge">TOP PICK</span>
                  </div>

                  <div className="destination-content">
                    <div className="destination-text">
                      <p className="destination-city">{item.city}</p>
                      <p className="destination-country">{item.country}</p>
                    </div>

                    <p className="destination-tag">{item.tag}</p>

                    <div className="destination-footer">
                      <p className="destination-price">
                        From <span>{item.price}</span> / night
                      </p>

                      <button
                        className="small-btn"
                        onClick={() => navigate(`/book/${item.id}`)}
                      >
                        Book
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <button className="footer-link">About Us</button>
            <button className="footer-link">Terms &amp; Conditions</button>
            <button className="footer-link">Privacy Policy</button>
          </footer>

        </main>

      </div>
    </div>
  );
}

export default Dashboard;




