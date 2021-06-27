import "./Popup.style.scss";

export default (props) => {
    return (
        <div className="popup">
            { props.children }
        </div>
    )
}