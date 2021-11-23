import React, { useState } from "react";

import { ContentDelete } from "../../Popups";
import { firestore, auth } from "../../../../../../firebase";
import { Link } from "react-router-dom";

import "./Assignment.style.scss";

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

export default ({ isTeacher, data, id, setPopup, getAssignments, amountAssigned = 0 }) => {
    const { title, description, topic, handedIn } = data;
    const uid = data.id;
    
    const [ open, setOpen ] = useState(false);

    const deleteHomework = async (id, uid) => {
		const fire = firestore.collection("classrooms");
        const base = fire.doc(id).collection("assignments");
        
        await base.doc(uid).delete();

        setPopup(null);

        getAssignments()
	}

    return (
        <div className="classroom-homework__outer">
            <div className={"classroom-homework__item classroom-homework__main align-center " + ( open && "classroom-homework--toggled" )} onClick={() => setOpen(!open)}>

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

                { isTeacher && <i class="classroom-homework__edit fas fa-ellipsis-v" onClick={(e) => (e.stopPropagation(), setPopup(<ContentDelete setPopup={setPopup} deleteContent={() => deleteHomework(id, uid)}/>))}></i> }
            </div>

            { open && 
            
            <div className="classroom-homework__item classroom-homework__info padding-20 flex-between">

                <div className="classroom-homework__outside">
                    <div className="classroom-homework__container">
                        <p>{ description }</p>
                    </div>

                    <div className="classroom-homework__inner">
                        <div className="classroom-homework__information">
                            <h1>0</h1>
                            <p>Handed in</p>
                        </div>

                        <div className="classroom-homework__information">
                            <h1>{ amountAssigned }</h1>
                            <p>Assigned</p>
                        </div>
                    </div>
                </div>

                <div className="classroom-homework__outside">
                    <Link to={id + "/a/" + uid} currentPath="/c" className="classroom-homework__link">View the assignment</Link>
                </div>

            </div> }
        </div>
    )
}