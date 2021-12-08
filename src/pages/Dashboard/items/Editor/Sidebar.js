import SidebarGroup from "./SidebarGroup";

import "./Sidebar.style.scss";

export default ({ onDragStart }) => {
    return (
        <div className="editor__nodes">
            <div className="editor__nodes-outer">
                <SidebarGroup title="Nodes">
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'input')} draggable>Input</div>
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'output')} draggable>Output</div>    
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'default')} draggable>Default</div>
                </SidebarGroup>
                <SidebarGroup title="Event Listeners">
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'classroom-enter')} draggable>Classroom Enter</div>
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'classroom-leave')} draggable>Classroom Leave</div>    
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'button')} draggable>Homework Submit</div>
                </SidebarGroup>
                <SidebarGroup title="Functions">
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'popup-open')} draggable>Popup Open</div>
                    <div className="editor__node" onDragStart={(event) => onDragStart(event, 'popup-close')} draggable>Popup Close</div>
                </SidebarGroup>
            </div>
            <button className="editor__run"><i className="fa fa-running"/>Test Workflow</button>
        </div>
    )
}