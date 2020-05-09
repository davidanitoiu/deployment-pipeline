import { createContext, Dispatch } from "react";
import { IChart, IFlowChartCallbacks } from "@mrblenny/react-flow-chart";
import { AnyAction } from "@reduxjs/toolkit";

export * from "./theme"
export * from "./types"
export * from "./usePipeline"

interface PipelineContext {
    chart: IChart,
    callbacks: IFlowChartCallbacks,
    chartDispatch: Dispatch<AnyAction>
}

export const PipelineContext = createContext<PipelineContext | null>(null);