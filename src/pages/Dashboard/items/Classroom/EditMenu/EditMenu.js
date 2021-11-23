import { useEffect, useState, useContext } from "react";

import "./EditMenu.style.scss";

export default (props) => {
    const [ editClicked, setEditClicked ] = useState(false);

    return (
       <div className="edit-outer">
          <span className="edit-outer__icon" onClick={(e) => (e.stopPropagation(), setEditClicked(!editClicked))}><i class="fas fa-ellipsis-h"></i></span>
          { editClicked ? 
             <ul className="edit-outer__menu">
                { props.children }
             </ul>
          : "" }
       </div>
    )
 }