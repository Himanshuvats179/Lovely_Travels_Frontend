import React from "react";
import "../css/cabSearch.css";


function CabSearchBar() {
  return (
    <div className="cab-search-container">
      <input type="text" placeholder="Pickup Location" />

      <input type="text" placeholder="Drop Location" />

      <input type="date" />

      <input type="time" />

      <button className="search-btn">Search Cabs</button>
    </div>
  );
}

export default CabSearchBar;
