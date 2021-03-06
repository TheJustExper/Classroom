import { ContentDelete } from "../Popups";
import { firestore } from "../../../../../firebase";

import ProgressBar from "../../../../../components/progressBar/ProgressBar"

import "./Topic.style.scss";

export default ({ data, setPopup, refresh, teacher, id }) => {
    const { title, description } = data;
    const uid = data.id;

    const deleteTopic = async () => {
        const fire = firestore.collection("classrooms");
        const base = fire.doc(id).collection("topics");
        
        await base.doc(uid).delete();

        setPopup(null);
        refresh();
    }

    const deleteContentPopup = (uid) => {
        setPopup(<ContentDelete setPopup={setPopup} deleteContent={deleteTopic}/>)
    }

    return (
        <div className="classroom-topic">
            <div className="classroom-topic__header" onClick={() => deleteContentPopup()}>
                <b>{ title }</b>
                {/* <p className="classroom-topic__subheading">{ description }</p> */}
                {/* { teacher && <span className="classroom-topic__edit" onClick={() => deleteContentPopup(uid)}><i class="fas fa-ellipsis-h"></i></span>} */}
            </div>

            {/* <div className="classroom-topic__content">
                <div className="classroom-topic__progress-bar">
                    <ProgressBar progress="0"/>
                    <span>0/10</span>
                </div> 
            </div> */}

        </div>
    )
}