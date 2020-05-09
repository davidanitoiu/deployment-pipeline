import { actions, IChart } from "@mrblenny/react-flow-chart";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { executeChartAction } from "./usePipeline";
import { addLink, removeNode, removeLink, setNodePosition } from "./store/actions/pipeline";

export const customCallbacks = (chart: IChart, chartDispatch: Dispatch<AnyAction>, dispatch: Dispatch<AnyAction>) => {

    return ({
        onDragCanvas: () => {
        }, //prevent canvas drag
        onLinkComplete: (...args: any) => {
            const actionLink = args[0];
            const from = chart.nodes[actionLink.fromNodeId].properties.name
            const to = chart.nodes[actionLink.toNodeId].properties.name
            const link = {
                from,
                to
            }

            dispatch(addLink(link));
            chartDispatch(executeChartAction({ action: actions.onLinkComplete(args) }));
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

            chartDispatch(executeChartAction({ action: actions.onDeleteKey(args) }));
        },
        onDragNodeStop: (...args: any) => {
            const {id, data} = args[0];

            const position = {
                x: data.x,
                y: data.y
            }

            dispatch(setNodePosition(id, position));
            chartDispatch(executeChartAction({ action: actions.onDragNodeStop(args) }));
        }
    })
}