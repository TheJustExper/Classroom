import React, { useContext, useState, useEffect } from "react";

import { hasRole, UserContext } from "../../providers/UserProvider";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

import Logo from "./../../styles/SVG/logo.png";

import UserDropdown from "../userDropdown/UserDropdown";

import "./header.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);
    const [ selected, setSelected ] = useState(localStorage.getItem('sidebarItem'));

    const links = [
        {
            title: "Classrooms",
            to: "/dashboard/c"
        },
        {
            title: "Editor",
            to: "/dashboard/editor"
        },
        {
            title: "Projects",
            to: "/dashboard/projects"
        },
    ]

    const textToImage = () => {
        
    }

    return (
        <div className="dashboard__header">
            <div className="dashboard__section">
                <div className="row">
                    <h1>studentroom</h1>
                </div>
                <div className="row">
                    <div className="links">
                        {
                            links.map(({ title, to }, index) => {
                                return (
                                    <Link onClick={() => { setSelected(index); localStorage.setItem('sidebarItem', index); }} to={to} className={ selected == index ? "links__item links__item--active" : "links__item" }>
                                        <div className="item-inner">
                                            <p>{ title }</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }

                        { user && hasRole(user, ["ADMIN"]) && 
                                <>
                                    <Link onClick={() => { setSelected(3); localStorage.setItem('sidebarItem', 3); }} to="/dashboard/users" className={ selected == 3 ? "links__item links__item--active" : "links__item" }>
                                        <div className="item-inner">
                                            <p>Users</p>
                                        </div>
                                    </Link>
                                </>
                        }   
                        
                    </div>
                </div>
                <div className="row">
                    { user && <UserDropdown user={user} setToggledTheme={props.setToggledTheme}/> }
                </div>
            </div>
        </div>
    )
}