import React, { useEffect, useState, useContext, createRef } from "react";
import { Link, Switch, useHistory, useParams, Route, useRouteMatch } from "react-router-dom";
import { UserContext, hasRole } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";
import { ClassroomStore } from "../../../../store";

import _ from "lodash";

import faker from "faker";

import Popup from "./Popups/classroom-content";
import Topic from "./Components/Topic";

import Error404Page from "../Error404/Error404";

import InputWithIcon from "../../../../components/commentInput/CommentInput";

import Assignment from "./Components/Assignment/Assignment";
import AssignmentView from "./Views/Assignment/AssignmentView";

import { ToggledSidebar, UntoggledSidebar } from "./Components/ClassroomSidebar";

import ProgressBar from "../../../../components/progressBar/ProgressBar"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import "./Classroom.style.scss";

export default (props) => {

    const  { id } = useParams();
	let { path, url } = useRouteMatch();

	const assignmentsRef = createRef();
	const topicsRef = createRef();

	const { user, loading } = useContext(UserContext);

	const [ usersList, setUsersList ] = useState([]);

    const [ classroom, setClassroom ] = useState({});
    const [ topics, setTopics ] = useState([]);
	const [ guides, setGuides ] = useState([]);
	const [ assignments, setAssignments ] = useState([]);

    const [ teachers, setTeachers ] = useState([]);
	const [ users, setUsers ] = useState([]);

	const [ isTeacher, setIsTeacher ] = useState(false);

	const [ sidebarActive, setSidebarActive ] = useState(localStorage.getItem("sidebar-active") === 'true');

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
		if (od == td) return <span className="classroom-homework__today">Due Today</span>;  
		if (od - td <= 3 && od - td >= 0) return <span className="classroom-homework__today classroom-homework__soon">Due Soon</span>;
		if (od - td < 0) return <span className="classroom-homework__today classroom-homework__late">Late</span>;
	}
    
    useEffect(async () => {
        if (user) {
            const itemRefs = firestore.collection('classrooms').doc(id);

            const doc = await itemRefs.get();

			if (doc.exists) {
				const items = doc.data();

				getUsers(items);
				setClassroom(items);
	
				getTopics();
				getGuides();
				getAssignments();
			} else {
				setClassroom(false);
			}
        }
    }, [ loading ]);
    
	if (!classroom) return (
		<div className="itemContent">
			<div className="itemContent__inner">
				<div className="classroom">
					<Error404Page/>
				</div>
			</div>
		</div>
	)

    if (classroom) {
		return (
			<>
					<div className="itemContent">
						<div className="itemContent__inner">
							<div className="classroom">
								<div className="classroom__header">
									<div className="text">
										<h1>{ classroom ? classroom.title : "Loading..." }</h1>
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
			
								<div className="classroom-outer">
			
									<div className="classroom-left">
			
										<InputWithIcon placeholder="Start a discussion" photoURL={user && user.photoURL} icon="fas fa-images"/> 
			
										<div className="container padding" ref={assignmentsRef}>
											<div className="row">
												<p>Assignment(s) <b>({ assignments.length })</b></p>
												<div className="line"></div>
											</div>
			
											{ assignments.length > 0 &&
												<div className="classroom-homework">

												{ getAssignmentsGrouped().map((data) => {
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
																return <Assignment getAssignments={getAssignments} setPopup={props.setPopup} data={data} id={id} amountAssigned={classroom.usersIds.length}/>
															})
														}
														</div>
													)
												})}

											</div>
											}
										</div>
										
										<div className="container padding" ref={topicsRef}>
											<div className="row">
												<p>Topic List <b>({ topics.length })</b></p>
												<div className="line"></div>
											</div>
			
											{ topics.length > 0 &&
												<div className="classroom-topics">
			
												{ topics.map(topic => <Topic data={topic} teacher={teachers.find(u => u.uid == user.uid)} id={id} refresh={getTopics} setPopup={props.setPopup}/>) }  
			
												</div>
											}
										</div>
			
									</div>
			
								</div>
							</div>

							<div className="itemContent__side">
								<div className="sideItem">

								</div>
							</div>
						</div>
					</div>

				{ sidebarActive ?  <ToggledSidebar setSidebar={setSidebar} teachers={teachers} users={users} /> : <UntoggledSidebar setSidebar={setSidebar} teachers={teachers} users={users} /> }
			</>
		)
	}
}