import "./Trial.style.scss";

export default () => {
    return (
        <div className="trial">
            <div className="trial__inner">
                <div className="trial__symbol">
                    <i className="fa fa-exclamation-triangle" />
                </div>
                <div className="trial__text">
                    <b>You are using free version of Studentroom which does not store data.</b>
                    <p>Sign up and subscribe to keep your data and access reports from anywhere.</p>
                </div>
            </div>
            <div className="button__outer">
                <button>Start Trial</button>
            </div>
        </div>
    )
}