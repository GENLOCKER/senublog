import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./features/auth.slice";

// Combine reducers
const rootReducer = combineReducers({
  auth,
});

// Check if the code is running in a browser environment
const isClient = typeof window !== "undefined";

// Persist configuration
const persistConfig = {
  key: "root",
  storage: isClient ? storage : storage, // Use null as the default value
  whitelist: ["auth"],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Types for better TypeScript integration
export type RootState = ReturnType<typeof rootReducer>; // State structure
export type AppDispatch = typeof store.dispatch; // Dispatch type

// Persistor for persisting store
export const persistor = persistStore(store);
