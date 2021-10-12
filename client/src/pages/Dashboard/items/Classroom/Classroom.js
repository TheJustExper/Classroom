import React, { useEffect, useState, useContext } from "react";
import { Link, Switch, useHistory, useParams, Route } from "react-router-dom";
import { UserContext, hasRole } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";

import _ from "lodash";

import faker from "faker";

import Popup from "./Popups/classroom-content";
import Topic from "./Components/Topic";

import { ContentDelete } from "./Popups";

import ProgressBar from "../../../../components/progressBar/ProgressBar"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import "./Classroom.style.scss";

class CircularProgressBar extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
  
	render() {
	  // Size of the enclosing square
	  const sqSize = this.props.sqSize;
	  // SVG centers the stroke width on the radius, subtract out so circle fits in square
	  const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
	  // Enclose cicle in a circumscribing square
	  const viewBox = `0 0 ${sqSize} ${sqSize}`;
	  // Arc length at 100% coverage is the circle circumference
	  const dashArray = radius * Math.PI * 2;
	  // Scale 100% coverage overlay with the actual percent
	  const dashOffset = dashArray - dashArray * this.props.percentage / 100;
  
	  return (
		<svg
			width={this.props.sqSize}
			height={this.props.sqSize}
			viewBox={viewBox}>
			<circle
			  className="circle-background"
			  cx={this.props.sqSize / 2}
			  cy={this.props.sqSize / 2}
			  r={radius}
			  strokeWidth={`${this.props.strokeWidth}px`} />
			<circle
			  className="circle-progress"
			  cx={this.props.sqSize / 2}
			  cy={this.props.sqSize / 2}
			  r={radius}
			  strokeWidth={`${this.props.strokeWidth}px`}
			  // Start progress marker at 12 O'Clock
			  transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
			  style={{
				strokeDasharray: dashArray,
				strokeDashoffset: dashOffset
			  }} />
			<text
			  className="circle-text"
			  x="50%"
			  y="50%"
			  dy=".3em"
			  textAnchor="middle">
			  {`${this.props.percentage}%`}
			</text>
		</svg>
	  );
	}
  }

export default (props) => {

    const  { id } = useParams();
	const [ usersList, setUsersList ] = useState([]);

    const { user, loading } = useContext(UserContext);

    const [ classroom, setClassroom ] = useState({});
    const [ topics, setTopics ] = useState([]);
	const [ tasks, setTasks ] = useState([]);
	const [ guides, setGuides ] = useState([]);
	const [ assignments, setAssignments ] = useState([]);

    const [ teachers, setTeachers ] = useState([]);
	const [ users, setUsers ] = useState([]);
	


	const [ sidebarActive, setSidebarActive ] = useState(false);

	const statuses = ["offline", "away", "online"];

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const UntoggledSidebar = () => {
		return (
			<div className="classroom-sidebar">
				<div className="toggle-sidebar" onClick={() => setSidebarActive(!sidebarActive)}>
					<i class="fas fa-toggle-on"></i>
					<p>Toggle Sidebar</p>
				</div>

				<div className="section">
						<b>Teachers - { teachers.length }</b>
						<div className="users">

						{ teachers && teachers.sort((a, b ) => b.status = a.status).map(({ uid, displayName, photoURL, status }) => {

							status = statuses[status]

							return (
								<div className="user">
									<div className="icon">
										<img className="user-me-icon" src={photoURL}/>
										<div className={"status " + status}></div>
									</div>
									<p>{ displayName }</p>
								</div>
							)

						})}

						</div>
				</div>	

				<div className="section">
						<b>Users - { users.length }</b>
						<div className="users">

						{ users && users.sort((a, b) => b.status - a.status).map(({ uid, displayName, photoURL, status }) => {

							status = statuses[status]

							return (
								<div className="user">
									<div className="icon">
										<img src={photoURL}/>
										<div className={"status " + status}></div>
									</div>
									<p style={{ color: "" }}>{ displayName }</p>
								</div>
							)

						})}

						</div>
				</div>	
														
			</div>
		)
	}

	const ToggledSidebar = () => {
		return (
			<div className="classroom-sidebar toggle">
				<div className="toggle-sidebar" onClick={() => setSidebarActive(!sidebarActive)}>
					<i class="fas fa-toggle-on"></i>
				</div>

				<div className="section">
						<b>Tea</b>
						<div className="users">

						{ teachers && teachers.sort((a, b ) => b.status = a.status).map(({ displayName, photoURL, status }) => {

							status = statuses[status]

							return (
								<div className="user">
									<div className="icon">
										<img src={photoURL}/>
										<div className={"status " + status}></div>
									</div>
								</div>
							)

						})}

						</div>
				</div>	

				<div className="section">
						<b>Use</b>
						<div className="users">

						{ users && users.sort((a, b) => b.status - a.status).map(({ displayName, photoURL, status }) => {

							status = statuses[status]

							return (
								<div className="user">
									<div className="icon">
										<img src={photoURL}/>
										<div className={"status " + status}></div>
									</div>
								</div>
							)

						})}

						</div>
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
		const group = _.groupBy(assignments, (work) => new Date(work.date).getUTCDate());

		const updated = Object.keys(group).map(key => {
			return {
				date: dateToString(group[key][0].date),
				data: group[key]
			}
		});

		console.log(assignments)

		return updated;
	}

	const getUsers = (items) => {
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
		var dateObj = new Date(date);

		var month = dateObj.getUTCMonth(); 
		var day = dateObj.getUTCDate() + 1;
		var year = dateObj.getUTCFullYear();
		var date = `${monthNames[month]} ${day}, ${year}`;

		return date;
	}
    
    useEffect(() => {
        if (user) {
            let itemRefs = firestore.collection('classrooms').doc(id);

            itemRefs.get().then(d => {
                const items = d.data();

				getUsers(items);

                setClassroom(items);
            });

            getTopics();
			getGuides();
			getAssignments();
        }
    }, [ loading ]);
    
    return (
        <>
            <div className="itemContent">
                <div className="classroom">
					<div className="classroom__header">
						<div className="text">
							<h1>{ classroom ? classroom.title : "Loading..." }</h1>
							<p className="title">There is { topics.length } topic(s) avaliable</p>
						</div>

						{ teachers.find(u => u.uid == user.uid) && (
							<div className="buttons">
								<span className="buttons__icon" onClick={() => openContentPopup()}><i class="fas fa-plus"></i></span>
								<span className="buttons__icon"><i class="fas fa-file"></i></span>
								<span className="buttons__icon"><i class="fas fa-cog"></i></span>
							</div>
						)}
					</div>

                    <div className="classroom-outer">

                        <div className="classroom-left">

                            <div className="container">
                                <div className="row">
                                    <p>Assignment(s) <b>({ assignments.length })</b></p>
                                    <div className="line"></div>
                                </div>

								<div className="classroom-homework">
									{ getAssignmentsGrouped().map((data) => {
										if (data.length == 0) return null;

										const od = new Date(data.date).getUTCDate() + 1;
										const td = new Date().getUTCDate();

										console.log(td, od)

										return (
											<div className="classroom-homework__section">
												<div className="classroom-homework__date_section">
													<p className="classroom-homework__date">{ dateToString(data.date) } </p>
													{ od == td ? <span className="classroom-homework__today">Due Today</span> :  
													  od - td <= 3 && od - td != 0 && <span className="classroom-homework__today classroom-homework__soon">Due Soon</span> }
												</div>

												{ data.data.map((data) => {
													const { title, topic } = data;
													const uid = data.id;

													return (
														<div className="classroom-homework__outer">
															<div className="classroom-homework__item" onClick={() => props.setPopup(<ContentDelete type="assignments" setPopup={props.setPopup} refresh={getAssignments} id={id} uid={uid}/>)}>
																<div className="classroom-homework__inner">
																	<CircularProgressBar
																		strokeWidth="2"
																		sqSize="30"
																		percentage={0}/>
																	<div className="classroom-homework__text">
																		<b>{ title }</b>
																		<p>{ topic }</p>
																	</div>
																</div>

																<i class="classroom-homework__edit fas fa-ellipsis-v"></i>
															</div>
														</div>
													)

												})
											}
											</div>
										)
									})}
								</div>
                            </div>
                            
                            <div className="container">
                                <div className="row">
                                    <p>Topic List <b>({ topics.length })</b></p>
                                    <div className="line"></div>
                                </div>

                                <div className="classroom-topics">

                                    { topics.map(topic => <Topic data={topic} teacher={teachers.find(u => u.uid == user.uid)} id={id} refresh={getTopics} setPopup={props.setPopup}/>) }  

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            { sidebarActive ?  <ToggledSidebar/> : <UntoggledSidebar/> }
        </>
    )
}