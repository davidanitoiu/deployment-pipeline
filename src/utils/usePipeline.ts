import { actions, IChart, IFlowChartCallbacks } from "@mrblenny/react-flow-chart";
import { AnyAction, createAction, createReducer } from "@reduxjs/toolkit";
import { mapValues } from "lodash";
import { Dispatch, useReducer } from "react";
import chartSimple from "./chartSimple.json";

export const setChartProperty = createAction('setChartProperty', ({ nodeId, name, value }: { nodeId: string, name: string, value: boolean }) => ({
    payload: {
        nodeId,
        name,
        value
    }
}));
export const executeChartAction = createAction('executeChartAction', ({ action }) => ({
    payload: {
        action
    }
}));

interface usePipeline {
    chart: IChart,
    callbacks: IFlowChartCallbacks,
    chartDispatch: Dispatch<AnyAction>
}

export const usePipeline = (title: string): [IChart, IFlowChartCallbacks, Dispatch<AnyAction>] => {
    const initialState: IChart = chartSimple;

    const reducer = createReducer(initialState, {
        [executeChartAction.type]: (state, { payload }) => {
            payload.action(state);
        },
        [setChartProperty.type]: (state, { payload }) => {
            state.nodes[payload.nodeId].properties[payload.name] = payload.value;
        }
    });

    const [chart, chartDispatch] = useReducer(reducer, initialState);

    const callbacks = {
        ...mapValues(actions, (func: any) => (...args: any) => chartDispatch(executeChartAction({ action: func(...args) }))),
    }

    return [chart, callbacks, chartDispatch]
}