import React from "react";

import Items from "../../pages/Dashboard/items/items";

import "./sidebar.style.scss";

export default (props) => {

    const renderItems = () => {
        return Items.map((item, index) => {
            return (
                <div className={ props.activeSection == index ? "item active" : "item" } onClick={() => props.setSection(index)}>
                    <img src={ item.img }/>
                    <p>{ item.name }</p>
                </div>
            )
        });
    }

    return (
        <div className="sidebar">
            <div className="section">
                <p className="title">General</p>
                { renderItems() }
            </div>
            <div className="section">
                <p className="title">Teams</p>
            </div>
        </div>
    )
}