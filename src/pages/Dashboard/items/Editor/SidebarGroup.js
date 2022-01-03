import { useState } from 'react';

import "./SidebarGroup.style.scss";

export default ({ title = "Default", children }) => {
    const [ selected, setSelected ] = useState(false);

    return (
        <div className="group__outer">
            <div className={"group__header " + (selected && "group__header--active")} onClick={() => setSelected(!selected)}>
                <i className={"fa fa-chevron-" + (selected ? "down" : "right")}/>
                <p>{ title }</p>
            </div>
            { selected && children && <div className="group__inner">{ children }</div> }
        </div>
    )
}