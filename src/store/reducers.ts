import {combineReducers} from "@reduxjs/toolkit";
import {InjectedReducersType} from "utils/types/injector-typings";


/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
function createReducer(injectedReducers: InjectedReducersType = {}) {
    // Initially we don't have any injectedReducers, so returning identity function to avoid the error
    if (Object.keys(injectedReducers).length === 0) {
        return state => state;
    }
    const rootReducer = combineReducers({
        ...injectedReducers,
    });

    return rootReducer;
}





// export const persistedReducer = persistReducer(rootPersistConfig, createReducer());

// export const persistedReducer = persistReducer(rootPersistConfig, createReducer());

export default createReducer;
