import Trial from "../../../../components/trial/Trial";
import Popup from "./Popups/element-add";

import Sidebar from "./Sidebar";

import React, { useEffect, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider, addEdge, removeElements } from 'react-flow-renderer';

import "./Editor.style.scss";

const initialElements = [];

let id = 0;
const getId = () => `NODE_${id++}`;

  
export default () => {
    const [elements, setElements] = useState(initialElements);

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge({ ...params, type: "smoothstep", animated: true }, els));

    const handleResize = () => reactFlowInstance !== null && reactFlowInstance.fitView();

    window.addEventListener('resize', handleResize)

    const onLoad = (reactFlowInstance) => {
        setReactFlowInstance(reactFlowInstance);
        reactFlowInstance.fitView();
    };

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onNodeTextChange = (event) => {
        setElements((els) =>
            els.map((e) => {
                if (e.id !== event.target.id) return { ...e }

                const text = event.target.value;

                return {
                    ...e,
                    data: { label: <input id={event.target.id} value={text} onChange={onNodeTextChange}/> }
                };
            })
        );
    }
    
    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const id = getId();

        const newNode = {
            id,
            type,
            position,
            data: { label: <input id={id} value={type} onChange={onNodeTextChange}/> },
        };

        setElements((es) => es.concat(newNode));
    };

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    
    return (
        <div className="editor">
           <ReactFlowProvider>

                <Sidebar onDragStart={onDragStart}/>

                <div className="editor__outer" ref={reactFlowWrapper}>
                    <ReactFlow
                        snapToGrid={true}
                        snapGrid={[10, 10]}
                        onLoad={onLoad}
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        deleteKeyCode={46}
                        onDrop={onDrop}
                        onDragOver={onDragOver}>
                            <Background variant="dots" gap={10} size={1} />     
                            <Controls />
                    </ReactFlow>
                </div>
           </ReactFlowProvider>
       </div>
    );
}

