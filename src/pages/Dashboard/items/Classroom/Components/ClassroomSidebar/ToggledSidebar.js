const statuses = ["offline", "away", "online"];

export default ({ teachers, users, setSidebar }) => {
    return (
        <div className="classroom-sidebar toggle">
            <div className="toggle-sidebar" onClick={() => setSidebar()}>
                <i class="fas fa-toggle-on"></i>
            </div>

            <div className="section">
                    <b>Tea</b>
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
                    <b>Use</b>
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