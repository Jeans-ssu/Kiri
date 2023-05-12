import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/modules/counterSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './modules/userSlice';
import authReducer from './modules/authSlice';
import searchReducer from './modules/searchSlice';
import tagReducer from './modules/tagSlice';
import ocrReducer from './modules/ocrSlice';

const persistConfig = {
  key: 'root',
  storage, //local Storage에 저장
  whitelist: ['auth', 'user'], //auth Reducer만 저장
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  auth: authReducer,
  search: searchReducer,
  tag: tagReducer,
  ocr: ocrReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//src/index.js에서 PersistGate 사용을 위한 persistor
export const persistor = persistStore(store);
