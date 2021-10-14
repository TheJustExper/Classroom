import React, { useState, useReducer } from "react";

import "./dropdown.style.scss";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default ({ toggled, toggle, children, value }) => { 
    const dateToString = (date) => {
		var dateObj = new Date(date);

		var month = dateObj.getMonth(); 
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();

		var date = `${monthNames[month]} ${day}, ${year}`;

		return date;
	}

    return (
        <div className="dropdown">
            <div className="dropdown__input" onClick={(e) => ( e.stopPropagation(), toggle() )}><p>{ value.length == 0 ? "Select a date" : dateToString(value) }</p> <i class="fas fa-sort-down"></i></div>

            { toggled && <div className="dropdown__box">
                { children }
            </div> }
        </div>
    )
}