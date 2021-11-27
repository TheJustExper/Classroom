import { useEffect, useState, useContext,  useReducer } from "react";
import { AlertContext } from "../../providers/AlertProvider";
import { UserContext, hasRole } from "../../providers/UserProvider";
import { firestore, auth } from "../../firebase";

import Header from "../../components/header/header";

import "./Account.style.scss";

export default () => {
    const { alert, setAlert } = useContext(AlertContext);
    const { user, refresh, loading } = useContext(UserContext);
    const [ itemSelected, setItemSelected ] = useState()
    const [ inputValues, setInputValues ] = useReducer((state, newState) => ({ ...state, ...newState }), { displayName: '', email: '' });
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const saveSettings = async () => {
        const userRef = firestore.collection("users").doc(user.uid);
        const { displayName } = inputValues;

        await userRef.update({ displayName });

        setAlert("Your account has been updated");
        refresh();

        //setTimeout(() => setAlert(null), 4000);
    }

    useEffect(() => {
        const { displayName, email } = user;

        setAlert(null);

        if (user) setInputValues({ displayName, email })
    }, [ loading ]);

    return (
        <div className="account">
            <Header>
                { alert && <div className="alert-outer">{ alert }</div> }
            </Header>

            <div className="account-content content">
                <div className="itemContent">
                    <div className="itemContent__inner account-content__container column">
                        <div className="itemContent__text">
                            <h1 className="itemContent__title">Account Settings</h1>
                            <p className="itemContent__subtitle">Change your profile and account settings</p>
                        </div>

                        <div className="itemContent__content">
                            <div className="itemContent__sidebar">
                                <div className="itemContent__sidebar-items">
                                    <div className="itemContent__sidebar-item">Account</div>
                                    <div className="itemContent__sidebar-item">Password</div>
                                    <div className="itemContent__sidebar-item">Notifications</div>
                                    <div className="itemContent__sidebar-item">Email Notifications</div>
                                    <div className="itemContent__sidebar-item">Help</div>
                                </div>
                            </div>

                            <div className="account-content__inner">
                                {/* <p className="account-content__subtitle">General Information</p> */}
                                <div className="input-outer">
                                    <label for="username">Username</label>
                                    <input name="displayName" placeholder="Username" value={inputValues.displayName} onChange={handleOnChange}/>
                                </div>
                                <div className="input-outer">
                                    <label for="title">Name and Surname</label>
                                    <input name="title" placeholder="Name and Surname" />
                                </div>
                                <div className="input-outer">
                                    <label for="email">Email</label>
                                    <input name="email" placeholder="Email" value={inputValues.email} onChange={handleOnChange}/>
                                </div>
                                <button onClick={() => saveSettings()}>Save Changes</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}