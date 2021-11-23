import React, { useState, useReducer } from "react";

import "./dropdown.style.scss";

const dateFormat = new Intl.DateTimeFormat('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric"
});

export default ({ toggled, toggle, children, value }) => { 
    const dateToString = (date) => {
		const dateObj = new Date(date);
        return dateFormat.format(dateObj);
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