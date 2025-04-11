import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./slices/authSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage,
    version: 1
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);
export default store;