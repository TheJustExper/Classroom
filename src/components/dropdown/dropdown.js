import React, { useState, useReducer } from "react";

import "./dropdown.style.scss";

export default ({ dataset = [], setInputValues = () => {}, inputValues = {}, value = "" }) => {
    const [ toggled, setToggled ] = useState(false);
    
    const onClick = (title) => {
        setInputValues({ [ value ]: title })
        setToggled(false);
    }

    return (
        <div className="dropdown">
            <div className="dropdown__input" onClick={() => setToggled(!toggled)}><p>{ inputValues[value] != undefined && inputValues[value].length == 0 ? "Select a value" : inputValues[value] }</p> <i class="fas fa-sort-down"></i></div>

            { toggled && <div className="dropdown__box">
                { dataset.map(({ title }) => {
                    return (
                        <div className="dropdown__item" onClick={() => onClick(title)}>
                            { title }
                        </div>
                    )
                })}
            </div> }
        </div>
    )
}