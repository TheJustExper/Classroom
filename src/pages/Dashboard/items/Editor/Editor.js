import Trial from "../../../../components/trial/Trial";
import Popup from "./Popups/element-add";
import localforage from "localforage";

import Sidebar from "./Sidebar";

import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider, addEdge, removeElements, Handle } from 'react-flow-renderer';

import { EditorContext } from "../../../../providers/EditorProvider";

import "./Editor.style.scss";
import { flow } from "lodash-es";

const initialElements = [];

let id = 1;

const getId = () => id++;
const flowKey = 'example-flow';

localforage.config({
    name: 'react-flow-docs',
    storeName: 'flows',
});
  
export default () => {
    const [ elements, setElements ] = useState([]);
    const [ alert, setAlert ] = useState(null);

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onElementClick = (e, element) => {
        setElements((els) =>
            els.map((e) => {
                if (e.source == element.id || e.target == element.id) return { ...e, animated: !e.animated }

                return {
                    ...e,
                };
            })
        );
    }

    const backgroundClick = (e) => {
        setElements((els) =>
            els.map((e) => {
                if (e.animated) return { ...e, animated: false }

                return {
                    ...e,
                };
            })
        );
    }

    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

    const onConnect = (params) => setElements((els) => addEdge({ ...params }, els));

    const handleResize = () => reactFlowInstance !== null && reactFlowInstance.fitView();

    window.addEventListener('resize', handleResize)
      
    const CustomNodeComponent = ({ data }) => {
    return (
        <div>
        <Handle type="target" position="top" style={{ borderRadius: 0 }} isConnectable={true} />
        <div>{data.label}</div>
        <Handle
            type="source"
            position="bottom"
            id="a"
            style={{ left: '30%', borderRadius: 0 }}
            isConnectable={true}
        />
        <Handle
            type="source"
            position="bottom"
            id="b"
            style={{ left: '70%', borderRadius: 0 }}
            isConnectable={true}
        />
        </div>
    );
    };
      
    const nodeTypes = {
        special: CustomNodeComponent
    }

    const Node = ({ data }) => {
        return (
            <div className="react-flow__node__outer">
                <div className="react-flow__node__icon">
                    <i className={"fa fa-sitemap"}/>
                </div>
                <div className="react-flow__node__inner">
                    <b>{ data.type }</b> 
                    <p>[{ data.id }]</p>
                </div>
            </div>
        )
    }

    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();

            if (flow.elements.length == 0) return localforage.removeItem(flowKey);

            console.log(elements)

            flow.id = id;
            flow.elements = flow.elements.map(data => ({ ...data, data: { label: "" } }))

            localforage.setItem(flowKey, flow);
        }
    }, [ reactFlowInstance ]);

    const restoreFlow = async () => {
        const flow = await localforage.getItem(flowKey);
  
        if (flow && Object.keys(flow).length > 0) {
          const [x = 0, y = 0] = flow.position;

          id = flow.id;

          flow.elements = flow.elements.map(data => ({ ...data, data: { label: <Node data={data}/>  } }))

          setElements(flow.elements || []);
        }
    };

    const onLoad = async (reactFlowInstance) => {
        setReactFlowInstance(reactFlowInstance);

        restoreFlow();

        reactFlowInstance.fitView();
    };

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };
    
    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const idd = getId();

        let newNode = {
            id: `${idd}`,
            type,
            position,
            text: "TEST",
            data: {
                label: <Node data={{ type, id }}/>
            }
        };

        setElements((es) => es.concat(newNode));
    };

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const headerButtonClick = (type) => {
        switch(type) {
            case 0:
                setAlert("Successfully Saved");
                onSave();
                break;
            default:
                break;
        }

        setTimeout(() => setAlert(null), 2500);
    }
    
    return (
        <div className="editor">
            { alert && <div className="editor__alert editor__alert--success">{ alert }</div> }
            <div className="editor__header">
                <div className="editor__header-button" onClick={() => headerButtonClick(0)}><i className="fa fa-save"/></div>
                <div className="editor__header-button"><i className="fa fa-backward"/></div>
                <div className="editor__header-button"><i className="fa fa-forward"/></div>
            </div>
            <div className="editor__outer">
                <ReactFlowProvider>
                        <Sidebar onDragStart={onDragStart}/>
                        
                        <div className="editor__inner" ref={reactFlowWrapper}>
                            <ReactFlow
                                snapToGrid={true}
                                snapGrid={[10, 10]}
                                onLoad={onLoad}
                                elements={elements}
                                onConnect={onConnect}
                                onElementClick={onElementClick}
                                onElementsRemove={onElementsRemove}
                                deleteKeyCode={46}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                nodeTypes={nodeTypes}>
                                    <Background variant="dots" gap={10} size={1} />     
                                    <Controls />
                            </ReactFlow>
                        </div>
                </ReactFlowProvider>
            </div>
        </div>
    );
}

