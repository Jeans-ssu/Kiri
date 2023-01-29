import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/modules/counterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './modules/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
