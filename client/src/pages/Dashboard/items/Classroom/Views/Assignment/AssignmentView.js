import React, { useState, useEffect, useContext } from "react";
import MDEditor from '@uiw/react-md-editor';
import faker from "faker";

import { ContentDelete } from "../../Popups";
import { firestore, auth } from "../../../../../../firebase";
import { UserContext, hasRole } from "../../../../../../providers/UserProvider";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import InputWithIcon from "../../../../../../components/commentInput/CommentInput";
import Error404Page from "../../../Error404/Error404.js";

import Doc from "../../../../../../styles/icons/files/doc.png";
import Xls from "../../../../../../styles/icons/files/xls.png";
import Pdf from "../../../../../../styles/icons/files/pdf.png";

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

    const Explanation = () => {
        return (
            <div className="mt-20 explanation full-width">
                { isTeacher ?  editContent ? 
                    <div className="explanation__content">
                        <MDEditor value={value} onChange={setValue} />
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
        )
    }

    const StudentContent = () => {
        return (
            <div className="container padding">

            </div>
        )
    }

    const TeacherContent = () => {
        return (
            <div className="mt-20 student-marking">
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

    const Information = () => {
        return (
             showInformation && <div className="container information">
                <div className="information__inner">
                    <h2>Did you know...</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
                    <a href="#">Learn more -></a>

                    <div className="background"></div>
                </div>

                <span className="information__exit" onClick={() => setShowInformation(false)}>X</span>
            </div> 
        )
    }

    const Attachment = ({ name, size, icon }) => {
        return (
            <div className="attachments__attachment">
                <img src={icon} />
                <div className="attachments__text">
                    <b>{ name }</b>
                    <p>{ size } MB</p>
                </div>
            </div>
        )
    }

    const addSubmission = async () => {
        const itemRefs       = firestore.collection('classrooms').doc(id);
        const assignmentRefs = itemRefs.collection("assignments");
        const submissions    = assignmentRefs.doc(assignmentId).collection("submissions");

        await submissions.add({
            userId: user.uid,
            userPhotoURL: user.photoURL,
            userName: user.displayName,

            submission: "Testing",
            grade: "B+",

            dateSubmitted: Date.now(),
        });
    }

    useEffect(async () => {
        if (id == null || assignmentId == null) return; 
        
        let itemRefs = firestore.collection('classrooms').doc(id);
        let assignmentRefs = itemRefs.collection("assignments").doc(assignmentId);
        let submissionRefs = assignmentRefs.collection("submissions");

        const doc = await assignmentRefs.get()
        const submissions = await submissionRefs.get();
        const classroomData = await itemRefs.get();

        const items = submissions.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        });

        setClassroom(classroomData.data());
        setSubmitted(items);

        if (doc.exists) {
            setAssignment(doc.data());
            setValue(doc.data().content);

            let teacherRef = firestore.collection('users').doc(doc.data().setBy);

            let teacherDoc = await teacherRef.get();

            setTeacher(teacherDoc.data())

            if (user) setIsTeacher(classroomData.data().users.find(u => u.id == user.uid).role == "teacher");

        } else {
            setAssignment(false);
        }
    }, [ loading ])

    if (!assignment) return (
        <div className="itemContent">
            <div className="itemContent__inner">
                <div className="assignment-view">
                    <Error404Page/>
                </div>
            </div>
        </div>
    )

    // This is used for a sort of lazy loading

    if (Object.keys(assignment).length == 0) return (
        <div className="itemContent">
            <div className="itemContent__inner">
                <div className="assignment-view container padding">

                </div>

                <div className="itemContent__side">
                    <div className="sideItem"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="itemContent">
            <div className="itemContent__inner">
                <div className="assignment-view container padding">

                    <div className="assignment-view__header border-bottom">

                        <div className="flex-row space-between">
                            <div className="text mb-10">
                                <p className="mb-10">LESSON PLAN</p>

                                <h1>{ assignment.title }</h1>
                                <p>Assigned by: { teacher.displayName }</p>
                                <p className="mt-10">Due by: { dateToString(assignment.date) }</p>
                            </div>

                            { isTeacher && <div className="flex-column assignment-view__header-buttons">
                                <button className="small"><i class="fas fa-edit"></i> Edit Assignment</button> 
                                <button className="small clear"><i class="fas fa-th"></i> Submission</button>
                                <button className="small clear"><i class="fas fa-th"></i> Actions</button>
                            </div> }
                        </div>

                        {/* { classroom && <div className="bar">
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
                        </div>
                        
                        } */}
                    </div> 

                    <Information/>
                    <TeacherContent/>

                </div>

                <div className="itemContent__side">
                    <div className="sideItem">
                        <div className="sideItem__itemHeader flex-row">
                            <div className="text">
                                <b>Attatchments</b>
                            </div>

                            { isTeacher && <button className="small clear">Edit</button> }
                        </div>

                        <div className="sideItem__content">
                            <div className="attachments">

                                <Attachment name="Homework" size="5" icon={Pdf} />
                                <Attachment name="Homework" size="5" icon={Xls} />
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}