import React, { useState, useEffect, useContext } from "react";
import MDEditor from '@uiw/react-md-editor';
import faker from "faker";

import { ContentDelete } from "../../Popups";
import { firestore, auth } from "../../../../../../firebase";
import { UserContext, hasRole } from "../../../../../../providers/UserProvider";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import InputWithIcon from "../../../../../../components/commentInput/CommentInput";
import Error404Page from "../../../Error404/Error404.js";

import "./AssignmentView.style.scss";

export default (props) => {

    const { id, assignmentId } = useParams();

    const { user, loading } = useContext(UserContext);

    const [ value, setValue ] = useState("**Hello world!!!**");

    // Normal states for the assignment view

    const [ classroom, setClassroom ] = useState(false);
    const [ assignment, setAssignment ] = useState({});
    const [ teacher, setTeacher ] = useState({});
    const [ submitted, setSubmitted ] = useState([]);

    const [ selectedStudent, setSelectedStudent ] = useState(false);
    const [ showInformation, setShowInformation ] = useState(true);
    const [ clickedExit, setClickedExit ] = useState(false);
    const [ isTeacher, setIsTeacher ] = useState(false);
    const [ editContent, setEditContent ] = useState(false);

    const dateFormat = new Intl.DateTimeFormat('en-US', {
		month: "long",
		day: "numeric",
		year: "numeric"
	});

    const saveMarkdown = async () => {
        let itemRefs = firestore.collection('classrooms').doc(id);
        let assignmentRefs = itemRefs.collection("assignments").doc(assignmentId);

        await assignmentRefs.update({ content: value });

        setEditContent(false);
    }

    const dateToString = (date) => {
		const dateObj = new Date(date);
  		return dateFormat.format(dateObj);
	}

    const StudentContent = () => {
        return (
            <div className="container padding">

            </div>
        )
    }

    const TeacherContent = () => {
        return (
            <div className="container padding student-marking">
                    <div className="student-marking__buttons">
                        { selectedStudent ? (
                            <>
                                <button className="small">Grade</button>
                                <button className="small button__danger">Delete</button>
                                <button className="small clear">Request Resubmission</button>
                            </>
                        ) : (
                            <>
                                <button className="small inactive" disabled>Grade</button>
                                <button className="small button-danger button__danger--inactive" disabled>Delete</button>
                                <button className="small clear" disabled>Request Resubmission</button>
                            </>
                        ) }

                    </div>
                    <div className="student-marking__inner">
                        <table className="student-marking__table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Submission</th>
                                    <th>Submitted</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>

                            <tbody>
                                { submitted.map((userSub) => {
                                    const { id, userId, userPhotoURL, userName, submission, grade, dateSubmitted, selected } = userSub;

                                    return (
                                        <tr className={selectedStudent == userId && "student-marking__selectedStudent"} onClick={() => {
                                            if (selectedStudent == userId) return setSelectedStudent(false);
                                            setSelectedStudent(userId)
                                        }}>
                                            <td>
                                                <div className="user">
                                                    <img src={userPhotoURL}/>
                                                    { userName }
                                                </div>
                                            </td>
                                            <td><p className="student-marking__submission">{ id }</p></td>
                                            <td>{ dateToString(dateSubmitted) }</td>
                                            <td className="student-marking__grade">{ grade }</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }

    useEffect(async () => {
        if (id == null || assignmentId == null) return; 
        
        let itemRefs = firestore.collection('classrooms').doc(id);
        let assignmentRefs = itemRefs.collection("assignments").doc(assignmentId);
        let submissionRefs = itemRefs.collection("assignments").doc(assignmentId).collection("submissions");

        const doc = await assignmentRefs.get()
        const submissions = await submissionRefs.get();
        const classroomData = await itemRefs.get();

        const items = submissions.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        });

        setIsTeacher(classroomData.data().users.find(u => u.id == user.uid).role == "teacher");
        setClassroom(classroomData.data());
        setSubmitted(items);

        if (doc.exists) {
            setAssignment(doc.data());
            setValue(doc.data().content);

            let teacherRef = firestore.collection('users').doc(doc.data().setBy);

            let teacherDoc = await teacherRef.get();

            setTeacher(teacherDoc.data())

        } else {
            setAssignment(false);
        }
    }, [])

    if (!assignment) return (
        <div className="itemContent">
            <div className="itemContent__inner">
                <div className="assignment-view">
                    <Error404Page/>
                </div>
            </div>
        </div>
    )

    return (
        <div className="itemContent">
            <div className="itemContent__inner">
                <div className="assignment-view">
                    <div className="assignment-view__header">
                        <div className="flex-row space-between">
                            <div className="text">
                                <h1>{ assignment.title }</h1>
                                <p className="title">{ assignment.description }</p>
                            </div>

                            { isTeacher && <button className="small clear">Edit Assignment</button> }
                        </div>

                        { classroom && <div className="bar">
                            <div className="status-outer">
                                <div className="status">
                                    <p>{ submitted.length } Turned In</p>
                                </div>

                                <div className="status">
                                    <p>{ submitted.filter(s => s.grade.length > 0).length } Graded</p>
                                </div>

                                <div className="status">
                                    <p>{ classroom.users.length } Total students</p>
                                </div>
                            </div>

                            <div className="set-by">
                                <div className="teacher">
                                    <img src={ teacher.photoURL } />
                                    <p>{ teacher.displayName }</p>
                                </div>
                            </div>
                        </div>}
                    </div> 

                    <div className="container padding explanation">
                        { isTeacher ?  editContent ? 
                            <div className="explanation__content">
                                <MDEditor extraCommands={false} previewOptions={false} value={value} onChange={setValue} />
                                <div className="explanation__buttons">
                                    <button className="small" onClick={() => saveMarkdown()}>Save</button>
                                </div>
                            </div> :
                           <div className="explanation__content flex-row">
                                <MDEditor.Markdown source={value} />
                                <button className="small clear" onClick={() => setEditContent(true)}>Edit</button>
                            </div>
                        : 
                            <div className="explanation__content flex-row">
                                <MDEditor.Markdown source={value} />
                            </div>
                        }
                    </div>

                    { showInformation && <div className={`container information ${!clickedExit ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => (setShowInformation(false), setClickedExit(false))}>
                        <div className="information__inner">
                            <h2>Did you know...</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
                            <a href="#">Learn more -></a>

                            <div className="background"></div>
                        </div>

                        <span className="information__exit" onClick={() => setClickedExit(true)}>X</span>
                    </div> }

                    { isTeacher ? <TeacherContent/> : <StudentContent/> }

                    <div className="container padding">
                        <div className="assignment-view__comments">

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

                <div className="itemContent__side">
                    <div className="sideItem">
                        <div className="sideItem__itemHeader">
                            <img src={user.photoURL} />
                            <div className="text">
                                <b>{ user.displayName }</b>
                                <p>Market Beginner - 20 points</p>
                            </div>
                        </div>

                        <div className="sideItem__content">
                            <p>2 More lessons to be Market Leader</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}