import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";

import "./classroom-add.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const create = () => {
        const fire = firestore.collection("classrooms");
        
        fire.add({

            title: "Test Classroom",
            users: [{
                id: user.uid,
                role: "teacher"
            }],
            usersIds: [user.uid],
            date: Date.now(),

        }).then(async function({ id }) {

            const topics = fire.doc(id).collection("topics");
            const guide = fire.doc(id).collection("guides");

            await topics.add({ 
                title: "Testing Topic",
                description: "Understanding a testing thing",
            });

            await guide.add({
                id: 1,
                title: "Add new content",
                description: "Use the intuitive editing interface to fill your classroom with content",
                completed: false,
            })

            await guide.add({
                id: 2,
                title: "Invite users",
                description: "Invite new users to the classroom",
                completed: false,
            })

        });

        props.setPopup(null);
        props.refresh();
    }

    return (
        <Popup class="fixed">
            <div className="content popup-classroom">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Classroom creator</h1>
                </div>

                <div className="input-outer">
                    <label for="title">Name</label>
                    <input name="title" placeholder="Write a name"/>
                </div>

                <div className="input-outer">
                    <label for="description<">Description (optional)</label>
                    <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description"></textarea>
                </div>
            </div>

            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => create()}>Create Classroom</button>
            </div>
        </Popup>
    )
}