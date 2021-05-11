/**
 * Combine all reducers in this file and export the combined reducers.
 */
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import { InjectedReducersType } from "utils/types/injector-typings";

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

    const rootPersistConfig = {
        key: "root",
        storage,
        whitelist: ["auth"],
    };

    const authPersistConfig = {
        key: "auth",
        storage,
        whitelist: ["credentials"],
    };

    const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

    return persistedReducer;
}

// export const persistedReducer = persistReducer(rootPersistConfig, createReducer());

export default createReducer;
