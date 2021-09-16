import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";

import "./Users.style.scss";

export default (props) => {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const store = firestore.collection('users');

        store.get().then((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            
            setUsers(doc);
        });
    }, []);

    return (
        <div className="side">
            <div className="text">
                <h1>Users</h1>
                <p className="title">There is a total of { users.length } users registered</p>

                <table id="customers">
                    <tr>
                        <th>User</th>
                        <th>ID</th>
                        <th>Roles</th>
                    </tr>
                    { users && users.map((user) => {
                        return (
                            <tr>
                                <td className="user">
                                    <img src={user.photoURL}/>
                                    { user.displayName }
                                </td>
                                <td>{user.uid}</td>
                                <td><span className="role">{user.roles}</span></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
        )
}