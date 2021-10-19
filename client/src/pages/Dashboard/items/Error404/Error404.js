
import { ReactComponent as Error404 } from "./error.svg";
import { Link, useParams, useHistory } from "react-router-dom";

import "./Error404.style.scss";

export default () => {
    const history = useHistory();

    return (
        <div className="error404">
            <Error404 fill="#ccc" />
            <h1>oops!</h1>
            <p>We can't seem to find the page you were looking for</p>
            <button onClick={() => history.goBack()}>Go back</button>
        </div>
    )
}