import React from "react";

import "./input.style.scss";

export default (props) => {
    return (
        <input className="input" placeholder={props.placeholder}></input>
    )
}