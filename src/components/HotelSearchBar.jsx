import React from "react";
import "../css/hotelSearch.css";




function HotelSearchBar(){
   return (
     <div className="hotel-search-container" >
        <input type="text" placeholder="Enter City"/>
        <input type="date" placeholder="Check-in"/>
        <input type="date" placeholder="Check-out"/>
        <input type="number" placeholder="Guests" min="1"/>
        <button className="search-btn"> Search Hotels</button> 
     </div>);
}
export default HotelSearchBar ;