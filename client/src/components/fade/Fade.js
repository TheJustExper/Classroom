import React from 'react';
import "./fade.style.scss";

export default (props) => <div id="fade" onClick={() => props.setPopup(null)} style={{ display: "block" }}></div>;