const statuses = ["offline", "away", "online"];

export default ({ teachers, users, setSidebar }) => {
    return (
        <div className="classroom-sidebar">
            <div className="toggle-sidebar" onClick={() => setSidebar()}>
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
                                {/* <div className="user__text">
                                    <p>{ displayName }</p>
                                    <p className="user__id">{ uid }</p>
                                </div> */}
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
                                {/* <div className="user__text">
                                    <p>{ displayName }</p>
                                    <p className="user__id">{ uid }</p>
                                </div> */}
                                <p>{ displayName }</p>
                            </div>
                        )

                    })}

                    </div>
            </div>	
                                                    
        </div>
    )
}