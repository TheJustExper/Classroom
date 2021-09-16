import React, { useContext } from "react";
import { hasRole, UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

import Items from "../../pages/Dashboard/items/items";

import "./sidebar.style.scss";

export default (props) => {
    const user = useContext(UserContext);

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

                { user && hasRole(user, ["ADMIN"]) && 
                    <Link to="/dashboard/users" className="item">
                        <i class="fas fa-users"></i>
                        <p>Users</p>
                    </Link>
                }

                { renderItems() }
            </div>
            <div className="section">
                <p className="title">Teams</p>
            </div>
        </div>
    )
}