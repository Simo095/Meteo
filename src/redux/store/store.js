import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cookieReducer from "../reducer/cookieSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cookies"],
};
const mainReducers = combineReducers({
  cookies: cookieReducer,
});
const persistedReducer = persistReducer(persistConfig, mainReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
