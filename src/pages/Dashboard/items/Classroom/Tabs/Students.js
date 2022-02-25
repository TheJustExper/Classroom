import "./Students.style.scss";

export default ({ students }) => {
    return (
        <div className="container">
            <div className="row">
                <p>Students <b>({ students.length })</b></p>
                <div className="line"></div>
            </div>

            <div className="students">
                { students && students.map(({ uid, displayName, photoURL, status }) => {
                    return (
                        <div className="students__student">
                            <img src={photoURL}/>
                            <p>{ displayName }</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}