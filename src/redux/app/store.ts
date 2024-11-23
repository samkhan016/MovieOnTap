import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginSlice from '../features/authSlice';

const rootReducer = combineReducers({
  login: loginSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
