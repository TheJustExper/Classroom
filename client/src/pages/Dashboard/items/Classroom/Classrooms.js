import { useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";

import Popup from "./Popups/classroom-add";

import "./Classrooms.style.scss";

export default (props) => {

    return (
        <div className="side">
            <div className="text">
                <h1>Classrooms</h1>
                <p className="title">Seach directory of { 0 } classrooms</p>

                <div className="buttons">
                    <button className="classroom-add" onClick={() => props.setPopup(<Popup setPopup={props.setPopup}/>)}>+ Add new classroom</button>
                    <button className="classroom-join clear">Join a classroom</button>
                </div>
            </div>

            <div className="classrooms-outer">
                <div className="classroom">
                    <div className="head">
                        <div className="text">
                            <p>Classroom</p>
                            <h3>Database Design and Development</h3>
                        </div>
                        <span className="edit-icon"><i class="fas fa-ellipsis-v"></i></span>
                    </div>
                    <div className="user">
                        <img src="https://lh3.googleusercontent.com/a/AATXAJxNZsoLdRTHpWvdQ9HE8JGJ23rNejpqKm_gQJOj=s96-c"/>
                        <p>Lorem Ipsum</p>
                    </div>
                </div>
            </div>
        </div>
    )
}