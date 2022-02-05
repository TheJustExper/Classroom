import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

export default () => {
    const { user, loading } = useContext(UserContext);
    const history = useHistory();
    
    const [ classrooms, setClassrooms ] = useState([]);

    useEffect(async () => {
        let itemRefs = firestore.collection('classrooms').where("usersIds", "array-contains", user.uid);
        let doc = await itemRefs.get();
        let items = doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        setClassrooms(items);
    }, [])
    
    return (
        <div className="classroom-sidebar__outer">
            { classrooms.length > 0 && classrooms.map(({ title, id }) => {
                return (
                    <div className="classroom-sidebar__item" 
                         onClick={() => history.push("/dashboard/c/" + id)}>{ title.charAt(0) }</div>
                )
            })}
        </div>
    )
}