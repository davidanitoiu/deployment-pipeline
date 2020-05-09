import { createReducer } from "@reduxjs/toolkit";
import { PipelineReducer } from "../../types";

const initialState:PipelineReducer = {
    selectedPipeline: "",
    pipelines: []
}

export const pipeline = createReducer(initialState, {
    
})