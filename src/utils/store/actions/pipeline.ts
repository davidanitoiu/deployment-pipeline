import { INode, IPosition } from "@mrblenny/react-flow-chart";
import { createAction } from "@reduxjs/toolkit";

export const addNode = createAction('pipeline/addNode', (node: INode) => ({
    payload: {
        ...node.properties,
        position: node.position
    }
}));

export const addLink = createAction('pipeline/addLink', (link) => ({
    payload: {
        id: `${link.from}_${link.to}`,
        from: link.from,
        to: link.to
    }
}));

export const removeLink = createAction('pipeline/removeLink', (id: string) => ({
    payload: {
        id,
    }
}));

export const removeNode = createAction('pipeline/removeNode', (name: string) => ({
    payload: {
        name,
    }
}));

export const setAutoDeploy = createAction('pipeline/setAutoDeploy', ({ selectedNodeName, checked }: { selectedNodeName: string, checked: boolean }) => ({
    payload: {
        selectedNodeName,
        checked
    }
}));
export const addPipeline = createAction('pipeline/addPipeline', (title: string) => ({
    payload: {
        title
    }
}));
export const setSelectedPipeline = createAction('pipeline/setSelectedPipeline', (title: string) => ({
    payload: {
        title
    }
}));

export const setNodePosition = createAction('pipeline/setNodePosition', (name:string,nodePosition:IPosition) => ({
    payload: {
        name,
        position: nodePosition
    }
}))
