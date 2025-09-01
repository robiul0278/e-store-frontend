// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducers from "./features/authSlice";
import { baseApi } from './api/api';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';

// redux-persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // শুধুমাত্র auth slice persist হবে
};

// combine reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducers,
});

// persist wrapper
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist compatibility
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'

});

if (process.env.NODE_ENV !== 'production') {
  console.log("Dev mode");
} else {
  console.log("Prod mode");
}


// export persistor
export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;