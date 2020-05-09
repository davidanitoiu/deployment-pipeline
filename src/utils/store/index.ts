import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {pipeline,environments} from "./reducer"

const rootReducer = combineReducers({
    pipeline,
    environments
})

// Used for to enable Redux Dev Tools browser extension


const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;
export type RootState = ReturnType<typeof store.getState>