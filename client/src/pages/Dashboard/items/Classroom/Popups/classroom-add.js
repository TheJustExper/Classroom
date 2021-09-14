import React, { useState } from "react";

import Popup from "../../../../../popups/Popup";
import Img from "./bg.svg";

import "./classroom-add.style.scss";

export default (props) => {
    const progressTypes = [{
        title: "Information",
        render: () => {
            return (
                <>
                    <div className="input-outer">
                        <label for="title">Name</label>
                        <input name="title" placeholder="Write a name"/>
                    </div>

                    <div className="input-outer">
                        <label for="description<">Description (optional)</label>
                        <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description"></textarea>
                    </div>
                </>
            )
        }
    },
    {
        title: "End",
        render: () => {
            return (
                <>
                    <div className="img-outer">
                        <img src={Img}/> 
                    </div>
                    <div className="text-under">
                        <b>Everything is done!</b>
                        <p>Now, you can close this window and start teaching.</p>
                    </div>
                </>
            )
        }
    }]

    const next = () => {
        setProgress(progress + 1);

        if (progress + 1 == progressTypes.length) props.setPopup(null);
    }
    
    let [ progress, setProgress ] = useState(0);

    return (
        <Popup class="fixed">
            <div className="content popup-classroom">
                {/* <div className="process-outer">
                    { progressTypes.map((type, index) => {
                        return (
                            <div className={"process " + (progress != index ? "completed" : "") }>
                                { progress != index ? 
                                    <span className="process-id">
                                        <i class="fas fa-check"></i>
                                    </span> : 
                                    <span className="process-id">{ index + 1}</span> 
                                }
                                <p>{ type.title }</p>
                            </div>
                        )
                    }) }
                </div> */}

                <div className="text">
                    <p>Expers website</p>
                    <h1>Classroom creator</h1>
                </div>

                { progressTypes[progress] != null || progressTypes[progress] != undefined ? progressTypes[progress].render() : "" }
                
            </div>

            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => next()}>Next step</button>
            </div>
        </Popup>
    )
}