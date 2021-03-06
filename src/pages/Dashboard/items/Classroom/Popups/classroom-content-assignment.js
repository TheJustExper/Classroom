import React, { useReducer, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Calendar from 'react-calendar'
import Popup from "../../../../../popups/Popup";

import DropDown from "../../../../../components/dropdown/dropdown";
import DropDownChild from "../../../../../components/dropdown/dropdownchild";

import 'react-calendar/dist/Calendar.css';
import "./classroom-content-assignment.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '', description: '', topic: '', date: new Date().valueOf() }
    );
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const create = async () => {
        const { title, description, topic } = inputValues;

        if (title.length == 0 || description.length == 0 || topic.length == 0) return;

        const fire = firestore.collection("classrooms");

        const assignments = fire.doc(props.id).collection("assignments");

        const { id } = await assignments.add({
            title, 
            description,
            content: "## Testing",
            topic,
            date: inputValues.date.valueOf(),
            setBy: user.uid,
        });

        const submissions = assignments.doc(id).collection("submissions");

        await submissions.add({
            userId: user.uid,
            userPhotoURL: user.photoURL,
            userName: user.displayName,

            submission: "Testing",
            grade: "B+",

            dateSubmitted: Date.now(),
        })

        props.setPopup(null);
        props.refresh();
    }

    const [ toggledCalender, setToggledCalender ] = useState(false);

    return (
        <Popup class="fixed">
            <div className="content" >
                <div className="text">
                    <p>Expers website</p>
                    <h1>Assignment</h1>
                </div>

                <div className="input-outer">
                    <label for="title">Name</label>
                    <input name="title" placeholder="Write a name" onChange={handleOnChange}/>
                </div>

                <div className="input-outer">
                    <label for="description<">Description (optional)</label>
                    <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description" onChange={handleOnChange}></textarea>
                </div>

                <div className="input-outer">
                    <label for="title">Due Date</label>

                    <DropDownChild value={inputValues.date} toggled={toggledCalender} toggle={() => setToggledCalender(!toggledCalender)}>
                        <Calendar
                            onChange={(date) => {
                                console.log(date, date.valueOf())
                                setInputValues({ date: date.valueOf() }) 
                                setToggledCalender(false); 
                            }}
                            showWeekNumbers
                            value={new Date(inputValues.date)}
                        />
                    </DropDownChild>

                </div>

                <div className="input-outer">
                    <label for="title">Topic</label>
                    <DropDown value="topic" dataset={props.topics} inputValues={inputValues} setInputValues={setInputValues}/>
                </div>
            </div>

            <div className="bottom">
                <button className="button small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="button small" onClick={() => create()}>Create</button>
            </div>
        </Popup>
    )
}