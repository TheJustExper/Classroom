import { useEffect, useState, useContext } from "react";
import { Link, Switch, useHistory, useParams, Route } from "react-router-dom";
import { UserContext, hasRole } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";

import faker from "faker";

import Popup from "./Popups/classroom-content";
import ProgressBar from "../../../../components/progressBar/ProgressBar"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import "./Classroom.style.scss";

export default (props) => {

    const  { id } = useParams();
	const [ usersList, setUsersList ] = useState([]);

    const { user, loading } = useContext(UserContext);

    const [ classroom, setClassroom ] = useState({});
    const [ topics, setTopics ] = useState([]);
	const [ tasks, setTasks ] = useState([]);
	const [ guides, setGuides ] = useState([]);

    const [ teachers, setTeachers ] = useState([]);
	const [ users, setUsers ] = useState([]);
	


	const [ sidebarActive, setSidebarActive ] = useState(false);

	const statuses = ["offline", "away", "online"];

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var dateObj = new Date();

	var month = dateObj.getUTCMonth() + 1; 
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var date = `${monthNames[month]} ${day}, ${year}`;

	const percentage = 20;

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
										<img src={photoURL}/>
										<div className={"status " + status}></div>
									</div>
									<p className={uid == user.uid && "user-me"}>{ displayName }</p>
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
									<p className={uid == user.uid && "user-me"}>{ displayName }</p>
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
						<b>Te</b>
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
						<b>Us</b>
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

    const Topic = ({ data }) => {
        const { title, description } = data;

        return (
            <div className="classroom-topic">
                <div className="topic-header">
                    
                </div>

                <div className="content">
                    <div className="topic-progress-bar">
                        <ProgressBar progress=""/>
                        <span>0/10</span>
                    </div>

                    <b>{ title }</b>
                    <p className="content-subheading">{ description }</p>

                    <div className="buttons">
                        <button className="small">View <i class="fas fa-arrow-circle-right"></i></button>
                    </div>
                </div>

            </div>
        )
    }

    const Activity = () => {
        return (
            <div className="activity">
                <img src={faker.image.avatar()}/>
                <div className="text">
                    <p className="title"><span>{faker.name.findName()}</span> edited <font>Blog</font></p>
                    <p>March 22nd, 2019</p>
                </div>
            </div>
        )
    }

	const Radial = ({ progress }) => {
		let percentage = progress;

		return (
			<div style={{ width: 40, height: 40 }}>
				<CircularProgressbar
					value={percentage}
					text={`${percentage}%`}
					styles={buildStyles({
						// Rotation of path and trail, in number of turns (0-1)
						rotation: 0.25,

						// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
						strokeLinecap: 'butt',

						// Text size
						textSize: '25px',

						// How long animation takes to go from one percentage to another, in seconds
						pathTransitionDuration: 0.5,

						// Can specify path transition in more detail, or remove it entirely
						// pathTransition: 'none',

						// Colors
						pathColor: "#eb5255",
						textColor: '#fff',
						trailColor: '#252628',
						backgroundColor: '#252628',
					})}
				/>
			</div>
		)
	}

    const addTopic = () => {
        let itemRefs = firestore.collection('classrooms').doc(id);
        let topicsRefs = itemRefs.collection("topics");

        topicsRefs.add({ 
            title: "Testing Topic",
            description: "Understanding a testing thing",
        });
    }

	const addContent = () => {
		addTopic();
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
			const items1 = doc.docs.map((doc) => {
				return { id: doc.id, ...doc.data() }
			});
			
			setGuides(items1);                 
		});
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

	const openContentPopup = () => {
		props.setPopup(<Popup/>);
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
        }
    }, [ loading ]);
    
    return (
        <>
            <div className="itemContent">
                <div className="classroom side">
                    <div className="head-image">
                        <div className="image"></div>
                        <div className="gradient"></div>
                    </div>

					<div className="text">
						<h1>{ classroom ? classroom.title : "Loading..." }</h1>
						<p className="title">There is <b>{ topics.length }</b> topic(s) avaliable in <b>{ classroom.title }</b></p>
					</div>

					{ teachers.find(u => u.uid == user.uid) && (
						<div className="buttons">
							<button onClick={() => openContentPopup()}>Add Content</button>
							<button className="clear">Settings</button>
						</div>
					)}

                    <div className="classroom-outer">

                        <div className="classroom-left">

							{ guides.length > 0 &&
								<div className="container">
									<div className="row">
										<i class="fas fa-book"></i>
										<p>Your quick start guide</p>
										<div className="line"></div>
									</div>

									<div className="classroom-guides">
										
										{ guides.map(({ title, description, completed }) => {
											return (
												<div className="guide">
													<div className="guide-inner">
														<div className="guide-icon">
															{ completed ? <div className="icon checked">
																<i class="fas fa-check"></i>
															</div> : <div className="icon"></div>
															}
														</div>

														<div className="guide-text">
															<b>{ title }</b>
															<p>{ description }</p>
														</div>
													</div>

													<i class="more-info fas fa-chevron-right"></i>
											</div>
											)
										})}

									</div>
								</div>
							}

                            <div className="container">
                                <div className="row">
                                    <i class="fas fa-tasks"></i>
                                    <p>Tasks <b>({ tasks.length })</b></p>
                                    <div className="line"></div>
                                </div>

								<table className="classroom-homework">
									<thead>
										<tr>
											<th>Topic</th>
											<th>Homework</th>
											<th>Due date</th>
											<th>Completion</th>
										</tr>
									</thead>
									<tbody>

										{ tasks.map((task) => {
											return (
												<tr>
													<td>Classroom Setup</td>
													<td>Finish setting up the classroom</td>
													<td>{ date }</td>
													<td>
														<ProgressBar progress={Math.random() * 100}/>
													</td>
												</tr>
											)
										})}
									
									</tbody>
								</table>
                            </div>
                            
                            <div className="container">
                                <div className="row">
                                    <i class="fas fa-thumbs-up"></i>
                                    <p>Topic List <b>({ topics.length })</b></p>
                                    <div className="line"></div>
                                </div>

                                <div className="classroom-topics">

                                    { topics.map(topic => <Topic data={topic}/>) }  

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