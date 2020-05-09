import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {pipeline} from "./reducer"

const rootReducer = combineReducers({
    pipeline
})

// Used for to enable Redux Dev Tools browser extension


const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;
export type RootState = ReturnType<typeof store.getState>