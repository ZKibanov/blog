import { configureStore } from '@reduxjs/toolkit';
import serviceSlice from './serviceReducer';
import dataSlice from './dataReducer';

const store = configureStore({
  reducer: {
    data: dataSlice,
    services: serviceSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
