import React, { useEffect, useState, useContext, createRef, useReducer } from "react";
import { Link, Switch, useHistory, useParams, Route, useRouteMatch } from "react-router-dom";
import { UserContext, hasRole } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";
import { ClassroomStore } from "../../../../store";
import MDEditor from '@uiw/react-md-editor';
import DropDown from "../../../../components/dropdown/dropdown";

import _ from "lodash";

import faker from "faker";

import Popup from "./Popups/classroom-content";
import Topic from "./Components/Topic";

import Error404Page from "../Error404/Error404";

import InputWithIcon from "../../../../components/commentInput/CommentInput";

import Assignment from "./Components/Assignment/Assignment";

import { ToggledSidebar, UntoggledSidebar } from "./Components/ClassroomSidebar";

import ProgressBar from "../../../../components/progressBar/ProgressBar"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import "./Classroom.style.scss";

export default (props) => {

    const  { id } = useParams();
	const history = useHistory();

	let { path, url } = useRouteMatch();

	const social = [
		{
			displayName: "Exper",
			photoURL: "https://lh3.googleusercontent.com/a-/AOh14Ggt3By84iVIEojD5xYhfTUh4najH7SNGAM5iOd-=s96-c",
			uid: "0c0L5gLvplOgFpcQK2dGsWB0ltg2",
			comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	]

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

	const [ sidebarActive, setSidebarActive ] = useState(localStorage.getItem("sidebar-active") === 'true');

	const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { filter: "Date" }
    );

	const setSidebar = () => {
		localStorage.setItem("sidebar-active", !sidebarActive);
		setSidebarActive(!sidebarActive);
	}

	const dateFormat = new Intl.DateTimeFormat('en-US', {
		month: "long",
		day: "numeric",
		year: "numeric"
	});

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

	const getAssignments = () => {
		let itemRefs = firestore.collection('classrooms').doc(id);

		let guidesRefs = itemRefs.collection("assignments");

		guidesRefs.get().then((doc) => {
			const items = doc.docs.map((doc) => {
				return { id: doc.id, ...doc.data() }
			});
			
			setAssignments(items);  
		});
	}

	const getAssignmentsGrouped = () => {
		const group = _.groupBy(assignments, (work) => new Date(work.date).getDate());

		const updated = Object.keys(group).map(key => {
			return {
				date: dateToString(group[key][0].date),
				data: group[key]
			}
		});

		return updated;
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
		getAssignments,
	}

	const openContentPopup = () => {
		props.setPopup(<Popup setPopup={props.setPopup} topics={topics} refresh={refresh} id={id}/>);
	}

	const dateToString = (date) => {
		const dateObj = new Date(date);
  		return dateFormat.format(dateObj);
	}

	const getDateString = (od, td) => {
		if (od == td) return "today";
		if (od - td <= 3 && od - td >= 0) return "soon";
		if (od - td < 0) return "late";
	}

	const getDateTag = (od, td) => {
		console.log(od, td);
		if (od == td) return <span className="classroom-homework__today">Due Today</span>;  
		if (od - td <= 3 && od - td >= 0) return <span className="classroom-homework__today classroom-homework__soon">Due Soon</span>;
		if (od - td < 0 || td - od < 0) return <span className="classroom-homework__today classroom-homework__late">Late</span>;
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
			getAssignments();
			
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
									<div className="classroom__items-item classroom__items-item--selected">Classroom</div>
									<div className="classroom__items-item">Assignments</div>
									{ isTeacher && (
										<>
											<div className="classroom__items-item">Marking</div>
											<div className="classroom__items-item">Analytics</div>
											<div className="classroom__items-item">Students</div>
										</>
									)}
								</div>
			
								<div className="classroom-outer">
			
									<div className="classroom-left">
			
										{/* <InputWithIcon placeholder="Start a discussion" photoURL={user && user.photoURL} icon="fas fa-images"/>  */}

										<div className="container container__background padding" ref={topicsRef}>
											<div className="row">
												<p>Social Activity</p>
												<div className="line"></div>
											</div>

											<div className="classroom-activity">

												{ social.map(({ uid, displayName, photoURL, comment }) => {
													return (
														<div className="classroom-activity__item">
															<img src={photoURL} />
															<div className="classroom-activity__content">
																<div className="classroom-activity__content-text">
																	<b className={teachers.find(u => u.uid == uid) ? "classroom-activity__content-text--teacher" : ""}>{ displayName }</b>
																	<p>@{ uid }</p>
																</div>
																<div className="classroom-activity__content-inner">
																	<MDEditor.Markdown source={comment} />
																</div>
															</div>
														</div>
													)
												})}

											</div>
										</div>

										
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

										 <div className="container container__background padding" ref={assignmentsRef}>
											<div className="row">
												<p>Assignment(s) <b>({ assignments.length })</b></p>
												<div className="line"></div>
												<div className="input-outer">
													<DropDown value="filter" dataset={[ { title: "Date" }, { title: "Due today" } ]} inputValues={inputValues} setInputValues={setInputValues}/>
												</div>
											</div>
			
											{ assignments.length > 0 &&
												<div className="classroom-homework">

												{ inputValues.filter == "Date" && getAssignmentsGrouped().map((data) => {
													if (data.length == 0) return null;
			
													const od = new Date(data.date).getDate();
													const td = new Date().getDate();
			
													return (
														<div className="classroom-homework__section">
															<div className="classroom-homework__date_section">
																<p className="classroom-homework__date">{ dateToString(data.date) } </p>
																{ getDateTag(od, td) }
															</div>
			
															{ data.data.map((data) => {
																return <Assignment isTeacher={isTeacher} getAssignments={getAssignments} setPopup={props.setPopup} data={data} id={id} amountAssigned={classroom.usersIds.length}/>
															})
														}
														</div>
													)
												})}

											</div>
											}
										</div> 
			
									</div>
			
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