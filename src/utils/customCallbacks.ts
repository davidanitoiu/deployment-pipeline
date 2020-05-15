import { actions, IChart } from "@mrblenny/react-flow-chart";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { addLink, removeLink, removeNode, setNodePosition } from "./store/actions/pipeline";
import { executeChartAction } from "./usePipeline";

// Typescript does not accept spread operators with functions. There is an open bug
// The offending lines will be ignored for now

export const customCallbacks = (chart: IChart, chartDispatch: Dispatch<AnyAction>, dispatch: Dispatch<AnyAction>) => {

    return ({
       onLinkComplete: (...args: any) => {
            const actionLink = args[0];
            const from = chart.nodes[actionLink.fromNodeId].properties.name
            const to = chart.nodes[actionLink.toNodeId].properties.name
            const link = {
                from,
                to
            }

            
            // @ts-ignore
            chartDispatch(executeChartAction({ action: actions.onLinkComplete(...args) }));

            dispatch(addLink(link));

            const argsWithChart = [{
                ...actionLink,
                chart
            }]

            // @ts-ignore
            const isLinkValid = actionLink.config.validateLink(...argsWithChart);
            if (isLinkValid) dispatch(addLink(link));
        },
        onDeleteKey: (...args: any) => {
            const { selected } = chart;

            if (selected.type === 'node') {
                const nodeName = chart.nodes[selected.id!].properties.name;
                dispatch(removeNode(nodeName));
            } else if (selected.type === 'link') {
                const selectedLink = chart.links[selected.id!];
                const linkId = `${selectedLink.from.nodeId}_${selectedLink.to.nodeId}`
                dispatch(removeLink(linkId));
            }

            // @ts-ignore
            chartDispatch(executeChartAction({ action: actions.onDeleteKey(...args) }));
        },
        onDragNodeStop: (...args: any) => {
            const { data } = args[0];

            const position = {
                x: data.x,
                y: data.y
            }

            dispatch(setNodePosition(data.node.innerText, position));
            // @ts-ignore
            chartDispatch(executeChartAction({ action: actions.onDragNodeStop(...args) }));
        }
    })
}