import React from "react";
import { Link } from "react-router-dom";

import Items from "../../pages/Dashboard/items/items";

import "./sidebar.style.scss";

export default (props) => {

    const renderItems = () => {
        return Items.map((item, index) => {
            return (
                <Link to={"/dashboard/" + item.name.toLowerCase()} className={ props.activeSection == index ? "item active" : "item" }>
                    <img src={ item.img }/>
                    <p>{ item.name }</p>
                </Link>
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