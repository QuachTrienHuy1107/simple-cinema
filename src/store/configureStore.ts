/**
 * Create the store with dynamic reducers
 */
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {createInjectorsEnhancer} from "redux-injectors";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import createReducer from "./reducers";

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
    reducer: createReducer(),
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

export default store;
