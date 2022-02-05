import React, { useEffect, useState, useContext, createRef, useReducer } from "react";
import { Link, Switch, useHistory, useParams, Route, useRouteMatch } from "react-router-dom";
import { UserContext, hasRole } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";
import { ClassroomStore } from "../../../../store";
import MDEditor from '@uiw/react-md-editor';
import DropDown from "../../../../components/dropdown/dropdown";

import faker from "faker";

import Popup from "./Popups/classroom-content";
import Topic from "./Components/Topic";

import Error404Page from "../Error404/Error404";

import InputWithIcon from "../../../../components/commentInput/CommentInput";

import { ToggledSidebar, UntoggledSidebar } from "./Components/ClassroomSidebar";

import ProgressBar from "../../../../components/progressBar/ProgressBar"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// Tabs

import Activity from "./Tabs/Activity";
import Assignments from "./Tabs/Assignments";

import 'react-circular-progressbar/dist/styles.css';
import "./Classroom.style.scss";

export default (props) => {

    const  { id } = useParams();
	const history = useHistory();

	let { path, url } = useRouteMatch();

	const assignmentsRef = createRef();
	const topicsRef = createRef();

	const [ showError404, setShowError404 ] = useState(false);

	const [ value, setValue ] = useState("**Hello world!!!**");

	const { user, loading } = useContext(UserContext);

	const [ usersList, setUsersList ] = useState([]);

    const [ classroom, setClassroom ] = useState(false);
    const [ topics, setTopics ] = useState([]);
	const [ guides, setGuides ] = useState([]);
	const [ assignments, setAssignments ] = useState([]);

    const [ teachers, setTeachers ] = useState([]);
	const [ users, setUsers ] = useState([]);

	const [ isTeacher, setIsTeacher ] = useState(false);

	const [ selectedTab, setSelectedTab ] = useState(0);
	const tabs = ["Classroom", "Assignments"]

	const [ sidebarActive, setSidebarActive ] = useState(localStorage.getItem("sidebar-active") === 'true');

	const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { filter: "Date" }
    );

	const setSidebar = () => {
		localStorage.setItem("sidebar-active", !sidebarActive);
		setSidebarActive(!sidebarActive);
	}

	const scrollIntoView = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

	const Quiz = () => {
		return (
			<div className="container flex-row align-center quiz__warning">
				<div className="quiz__text">
					<p><i className="fa fa-question"></i> Testing your skills</p>
				</div>
				<div className="">
					<button className="button small" onClick={() => history.push(`/dashboard/c/${id}/q/6UFkOgLqAi5yikMWxH1d`)}>Start Quiz</button>
					{ isTeacher && <button className="button small">Edit</button> } 
				</div>
			</div>
		)
	}

	const getTopics = () => {
		let itemRefs = firestore.collection('classrooms').doc(id);
        let topicsRefs = itemRefs.collection("topics");

		topicsRefs.get().then(doc => {
			const items = doc.docs.map((doc) => {
				return { id: doc.id, ...doc.data() }
			});

			setTopics(items);
		});
	}

	const getGuides = () => {
		let itemRefs = firestore.collection('classrooms').doc(id);

		let guidesRefs = itemRefs.collection("guides");

		guidesRefs.get().then((doc) => {
			const items = doc.docs.map((doc) => {
				return { id: doc.id, ...doc.data() }
			});
			
			setGuides(items);                 
		});
	}

	const getUsers = async (items) => {
		const usersRefs = firestore.collection("users").where("uid", "in", items.usersIds);

		usersRefs.get().then((doc) => {
			const items1 = doc.docs.map((doc) => {
				return { id: doc.id, role: items.users.find(u => u.id == doc.id).role, ...doc.data() }
			});

			const teachers = items1.filter(u => u.role == "teacher");
			const users = items1.filter(u => u.role != "teacher");

			setTeachers(teachers);
			setUsers(users);
			
			setUsersList(items1);    
			
			setIsTeacher(teachers.find(u => u.uid == user.uid))
		});
	}

	const refresh = {
		getTopics,
		getGuides,
		getAssignments: () => {}
	}

	const openContentPopup = () => {
		props.setPopup(<Popup setPopup={props.setPopup} topics={topics} refresh={refresh} id={id}/>);
	}
    
    useEffect(async () => {
        if (user) {
            const itemRefs = firestore.collection('classrooms').doc(id);
			const quizzes = itemRefs.collection("quizzes");
			
            const doc = await itemRefs.get();

			if (!doc.exists) return setShowError404(true);

			const items = doc.data();

			if (!items.usersIds.includes(user.uid)) return setShowError404(true);

			getUsers(items);
			setClassroom(items);

			getTopics();
			getGuides();
			
        }
    }, [ loading ]);

	if (showError404) {
		return (
			<div className="itemContent">
				<div className="itemContent__inner">
					<div className="classroom">
						<Error404Page/>
					</div>
				</div>
			</div>
		)
	}

	if (!classroom) return <div className="itemContent"></div>;

    if (classroom) {
		return (
			<>
				<div className="classbar">
					<div className="classbar__section">
						<p>CHANNELS</p>
						<div className="classbar__inner">
							<div className="classbar__item"><a>announcements</a></div>
							<div className="classbar__item"><a>resources</a></div>
							<div className="classbar__item"><a>general</a></div>
						</div>
					</div>
				</div>
				
				<div className="itemContent">
					<div className="itemContent__inner itemContent__inner--1000">
						<div className="classroom">

							<div className="container container__background padding classroom__header">
								<div className="text">
									<h1>{ classroom.title || "Loading..." }</h1>
									<p className="title">There is { topics.length } topic(s) avaliable</p>
								</div>
		
								{ isTeacher && (
									<div className="buttons">
										<span className="buttons__icon" onClick={() => openContentPopup()}><i class="fas fa-plus"></i></span>
										<span className="buttons__icon"><i class="fas fa-file"></i></span>
										<span className="buttons__icon"><i class="fas fa-cog"></i></span>
									</div>
								)}
							</div>

							<div className="classroom__items">
								{ tabs.map((tab, index) => { 
									return <div onClick={() => setSelectedTab(index)} className={"classroom__items-item " + ( selectedTab == index && "classroom__items-item--selected" )}>{ tab }</div> })
								}
								{ isTeacher && (
									<>
										<div className="classroom__items-item">Marking</div>
										<div className="classroom__items-item">Analytics</div>
										<div className="classroom__items-item">Students</div>
									</>
								)}
							</div>
		
							<div className="classroom-outer">
		
								
									{/* <div className="container" ref={topicsRef}>
										<div className="row">
											<p>Topic List <b>({ topics.length })</b></p>
											<div className="line"></div>
										</div>
		
										{ topics.length > 0 &&
											<div className="classroom-topics">
		
											{ topics.map(topic => <Topic data={topic} teacher={isTeacher} id={id} refresh={getTopics} setPopup={props.setPopup}/>) }  
		
											</div>
										}
									</div> */}

									{ selectedTab == 0 && <Activity teachers={teachers}/> }
									{ selectedTab == 1 && <Assignments id={id} isTeacher={isTeacher} setPopup={props.setPopup}/> }
		
								
		
							</div>
						</div>

						{/* <div className="itemContent__side">
							<div className="sideItem"></div>
						</div> */}

					</div>
				</div>

				{ sidebarActive ?  <ToggledSidebar setSidebar={setSidebar} teachers={teachers} users={users} /> : <UntoggledSidebar setSidebar={setSidebar} teachers={teachers} users={users} /> }
			</>
		)
	}
}