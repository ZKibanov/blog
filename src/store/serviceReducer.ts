import { createSlice } from '@reduxjs/toolkit';

interface ServiceState {
  isLoading: boolean;
  hasError: boolean;
}

const initialState = { isLoading: false, hasError: false } as ServiceState;

/* eslint-disable no-param-reassign */
const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setNotLoading(state) {
      state.isLoading = false;
    },
    setError(state) {
      state.hasError = true;
    },
    setNoError(state) {
      state.hasError = false;
    },
  },
});
/* eslint-enable */

export const {
  setLoading,
  setNoError,
  setNotLoading,
  setError,
} = serviceSlice.actions;

export default serviceSlice.reducer;
