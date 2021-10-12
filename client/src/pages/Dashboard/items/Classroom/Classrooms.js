import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../providers/UserProvider";
import { firestore, firebaser as firebase } from "../../../../firebase";

import Popup from "./Popups/classroom-add";

import "./Classrooms.style.scss";

export default (props) => {
    const history = useHistory();
    const [ classrooms, setClassrooms ] = useState([]);
    const { user, loading } = useContext(UserContext);

    const joinClassroom = (id) => {
        const classroom = firestore.collection("classrooms").doc(id);

        classroom.get().then((doc) => {
            let data = doc.data();

            if (!data.usersIds.includes(user.uid)) {
                classroom.update({
                    users: firebase.firestore.FieldValue.arrayUnion({
                        id: user.uid,
                        role: "user"
                    }),
                    usersIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
                })
                .then(() => {
                    console.log("Document successfully updated!");

                    loadClassrooms();
                });
            }
        });
    }

    const loadClassrooms = () => {
        let itemRefs = firestore.collection('classrooms').where("usersIds", "array-contains", user.uid);

        itemRefs.get().then(doc => {
            const items = doc.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            });

            setClassrooms(items);
        })
    }

    useEffect(() => {
        if (user) {
            loadClassrooms();
        }
    }, [loading]);

    return (
        <div className="itemContent">
            <div className="side">
                <div className="text">
                    <h1>Classrooms</h1>
                    <p className="title">Seach directory of { classrooms.length } classrooms</p>

                    <div className="flex-bar">
                        <button className="button classroom-add" onClick={() => props.setPopup(<Popup setPopup={props.setPopup} refresh={loadClassrooms}/>)}>+ Add new classroom</button>
                        <button className="button classroom-join clear" onClick={() => joinClassroom("VQrLusUVzX9IjE8wcaM5")}>Join a classroom</button>
                    </div>
                </div>

                <div className="classrooms-outer">
                    { classrooms && classrooms.map(({ title, id }) => {
                        return (
                            <div className="classroom-inner" onClick={() => history.push("/dashboard/classrooms/" + id)}>
                                <div className="head">
                                    <div className="text">
                                        <p>Classroom</p>
                                        <h3>{ title }</h3>
                                    </div>
                                    <span className="edit-icon"><i class="fas fa-ellipsis-v"></i></span>
                                </div>
                                <div className="user">
                                    <img src="https://lh3.googleusercontent.com/a/AATXAJxNZsoLdRTHpWvdQ9HE8JGJ23rNejpqKm_gQJOj=s96-c"/>
                                    <p>Lorem Ipsum</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}