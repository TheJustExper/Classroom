import { ContentDelete } from "../Popups";

import ProgressBar from "../../../../../components/progressBar/ProgressBar"

export default ({ data, setPopup, refresh, teacher, id }) => {
    const { title, description } = data;
    const uid = data.id;

    const deleteContentPopup = (uid) => {
        setPopup(<ContentDelete type="topics" setPopup={setPopup} refresh={refresh} id={id} uid={uid}/>)
    }

    return (
        <div className="classroom-topic">
            <div className="classroom-topic__header">
                
            </div>

            <div className="classroom-topic__content">
                <div className="classroom-topic__progress-bar">
                    <ProgressBar progress=""/>
                    <span>0/10</span>
                </div>

                <b>{ title }</b>
                <p className="classroom-topic__subheading">{ description }</p>

                <div className="classroom-topic__buttons">
                    <button className="small clear">View <i class="fas fa-arrow-circle-right"></i></button>
                    
                    { teacher && <span className="classroom-topic__edit" onClick={() => deleteContentPopup(uid)}><i class="fas fa-ellipsis-h"></i></span>}
                </div>
            </div>

        </div>
    )
}