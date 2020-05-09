import { actions, IChart, IFlowChartCallbacks } from "@mrblenny/react-flow-chart";
import { AnyAction, createAction, createReducer } from "@reduxjs/toolkit";
import { find, mapValues } from "lodash";
import { Dispatch, useReducer } from "react";
import { useSelector } from "react-redux";
import { generateChart } from "./generators";
import { RootState } from "./store";

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
    const pipeline = useSelector((state: RootState) => find(state.pipeline.pipelines, { title })!.chart);

    const initialState: IChart = generateChart(pipeline);

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