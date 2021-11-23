import React, { useContext } from "react";

import "./ProgressBar.style.scss";

export default (props) => {
    let width = props.progress;

    return (
        <div className="progress-bar">
            <div className={ width < 33 ?  "bar red" : width > 33 && width < 66 ? "bar amber" : width > 66 && width <= 100 ? "bar green" : "" } style={{ width: width + "%" }}></div>
        </div>
    )
}