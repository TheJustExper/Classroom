import { useEffect, useState } from "react";
import { firestore, auth } from "../../../../../firebase";
import Assignment from "../Components/Assignment/Assignment";
import _ from "lodash";

export default ({ id, isTeacher, setPopup }) => {
    const [ assignments, setAssignments ] = useState([]);

    const dateFormat = new Intl.DateTimeFormat('en-US', {
		month: "long",
		day: "numeric",
		year: "numeric"
	});

    useEffect(() => {
        getAssignments();
    }, [])

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
        // This needs updating
        
		return <span className="classroom-homework__today">...</span>;  
	}

    return (
        <div className="container container__background padding">
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
                                return <Assignment isTeacher={isTeacher} getAssignments={getAssignments} setPopup={setPopup} data={data} id={id} amountAssigned={2}/>
                            })
                        }
                        </div>
                    )
                })}

            </div>
            }
        </div>
    )
}