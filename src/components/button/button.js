import React from "react";

import "./button.style.scss";

export default (props) => {
    return <button className={"button " + props.style}>{props.children}</button>
}