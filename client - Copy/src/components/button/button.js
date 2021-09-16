import React from "react";

import "./button.style.scss";

export default (props) => {
    return <button className={props.style}>{props.children}</button>
}