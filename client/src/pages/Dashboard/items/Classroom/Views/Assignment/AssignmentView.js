import React, { useState, useEffect, useContext } from "react";

import { ContentDelete } from "../../Popups";
import { firestore, auth } from "../../../../../../firebase";

import { UserContext, hasRole } from "../../../../../../providers/UserProvider";

import { Link, useParams, useHistory } from "react-router-dom";

import InputWithIcon from "../../../../../../components/commentInput/CommentInput";
import Error404Page from "../../../Error404/Error404.js";

import "./AssignmentView.style.scss";

export default ({ data }) => {
    const { id, assignmentId } = useParams();
    const { user, loading } = useContext(UserContext);

    const [ assignment, setAssignment ] = useState({});

    const [ showInformation, setShowInformation ] = useState(true);
    const [ clickedExit, setClickedExit ] = useState(false);

    const history = useHistory();

    useEffect(async () => {
        if (id == null || assignmentId == null) return; 

        let itemRefs = firestore.collection('classrooms').doc(id);
        let guidesRefs = itemRefs.collection("assignments").doc(assignmentId);

        const doc = await guidesRefs.get()

        if (doc.exists) {
            setAssignment(doc.data());
        } else {
            setAssignment(false);
        }
    }, [])

    if (!assignment) return <Error404Page/>

    return (
        <div className="itemContent">
            <div className="assignment-view">

                <div className="assignment-view__header">
                    <div className="text">
                        <h1>{ assignment.title }</h1>
                        <p className="title">{ assignment.description }</p>
                    </div>
				</div> 

                { showInformation && <div className={`container information ${!clickedExit ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => (setShowInformation(false), setClickedExit(false))}>
                    <div className="information__inner">
                        <h2>Organizations</h2>
                        <p>Your applications can now authenticate users into organizations securely and easily with Auth0, making your application ready to do business with the organizations you work with.</p>
                        <a href="#">Learn more -></a>

                        <div className="background"></div>
                    </div>

                    <span className="information__exit" onClick={() => setClickedExit(true)}>X</span>
                </div> }

                <div className="container padding">
                    <div className="assignment-view__comments">

                        <div className="assignment-view__comment">
                            <img src={user.photoURL} />
                            <div className="text">
                                <b>Exper</b>
                                <p>Testing message for comment</p>
                            </div>
                        </div>

                        <div className="assignment-view__comment">
                            <img src={user.photoURL} />
                            <div className="text">
                                <b>Exper</b>
                                <p>Testing message for comment</p>
                            </div>
                        </div>

                    </div>

                    <InputWithIcon placeholder="Add class comment" photoURL={user.photoURL} />
                </div>
            </div>
        </div>
    )
}