import React, { useState, createContext, useReducer } from "react";

export const EditorContext = createContext({ 
    elements: [],
});

export default ({ children }) => {
  const [ elements, setElements ] = useState([]);

  const setNodeText = (id, text) => {
    console.log(elements)
    if (!elements.find(el => el.id == id)) return;

    setElements((els) =>
      els.map((el) => {
        if (el.id === id) el = { ...el, text }

        return el;
      })
    );
  }

  const getNodeText = (id) => {
    return elements.find(idc => idc.id == id);
  }

  return (
    <EditorContext.Provider value={{ elements, setElements, setNodeText, getNodeText }}>
      {children}
    </EditorContext.Provider>
  );
}
