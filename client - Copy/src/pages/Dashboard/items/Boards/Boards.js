import React, { useContext } from "react";

import "./Boards.style.scss";

import { UserContext } from "../../../../providers/UserProvider";

export default (props) => {
    const user = useContext(UserContext);

    return (
        <div className="boards">
            <div className="board card">
                <img src="https://papers.co/wallpaper/papers.co-we14-pattern-background-apple-iphone12-rainbow-36-3840x2400-4k-wallpaper.jpg"/>
            
                <div className="section">
                    <div className="uploader">
                        <img src={user.photoURL} referrerpolicy="no-referrer"/>
                        <p className="title">FlatStudio</p>
                    </div>

                    <i class="fas fa-eye"></i>
                </div>
            </div>
        </div>
    )
}