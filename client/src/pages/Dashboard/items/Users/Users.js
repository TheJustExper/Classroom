import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";

import faker from "faker";

import Popup from "./Popups/user-profile";

import "./Users.style.scss";

export default (props) => {
    const [ users, setUsers ] = useState([]);
    const [ searchFilter, setSearchFilter ] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;

        setSearchFilter(value);
    }

    const dataToRender = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const sorted = users.sort((a, b) => b.roles.includes("ADMIN") - a.roles.includes("ADMIN")).filter(e => 
            Object.keys(e).some(key => typeof e[key] == "string" && e[key].toLowerCase().includes(searchFilter.toLowerCase()))
        );

        return sorted.map((user) => {
            var dateObj = new Date(user.joined);

            var month = dateObj.getUTCMonth(); 
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            var date = `${monthNames[month]} ${day}, ${year}`;

            return (
                <tr>
                    <td>
                        <div className="user">
                            <img src={user.photoURL}/>
                            {user.displayName}
                        </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.uid}</td>
                    <td>{date}</td>
                    <td>{user.plan}</td>
                    <td><span className="role">{user.roles.join(",")}</span></td>
                    <td className="edit-user"><i class="fas fa-ellipsis-h" onClick={() => props.setPopup(<Popup user={user} setPopup={props.setPopup}/>)}></i></td>
                </tr>
            )
        })
    }

    const firestoreAutoId = () => {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      
        let autoId = ''
      
        for (let i = 0; i < 28; i++) {
          autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
          )
        }

        return autoId
      }

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
        <div className="itemContent">
            <div className="itemContent__inner">
                <div className="side">
                    <div className="text">
                        <h1>Users</h1>
                        <p className="title">Showing a total of { users.length } users</p>

                        <div className="flex-bar space-between">
                            <div className="input-with-icon">
                                <i class="fas fa-search"></i>
                                <input placeholder="Search for a user" value={searchFilter} onChange={handleChange}/>
                            </div>
                            <div className="buttons">
                                <button className="button classroom-join clear">Filter</button>
                                <button className="button classroom-join">Import / Export</button>
                            </div>
                        </div>

                        <div className="table-outer">
                            <table id="customers">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>UID</th>
                                        <th>Joined</th>
                                        <th>Plan</th>
                                        <th>Roles</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { dataToRender() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}