import storage from "redux-persist/lib/storage";
/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createInjectorsEnhancer } from "redux-injectors";
import persistStore from "redux-persist/es/persistStore";
import createSagaMiddleware from "redux-saga";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createReducer, { persistedReducer } from "./reducers";
import immutableTransform from "redux-persist-transform-immutable";

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const { run: runSaga } = sagaMiddleware;

// Create the store with saga middleware
const middlewares = [sagaMiddleware];

const enhancers = [
    createInjectorsEnhancer({
        createReducer,
        runSaga,
    }),
];

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        ...getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
});

export const persistor = persistStore(store);

export default store;
