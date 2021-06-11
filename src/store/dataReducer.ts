import { createSlice } from '@reduxjs/toolkit';
import { Article, User } from '../types';

interface DataState {
  articles: Article[];
  user: User | null;
}

const initialState = { articles: [], user: null } as DataState;
/* eslint-disable no-param-reassign */
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setArticlesToStore(state, action) {
      state.articles = action.payload;
    },
    updateUserInStore(state, action) {
      state.user = action.payload;
    },
  },
});
/* eslint-enable */

export const { setArticlesToStore, updateUserInStore } = dataSlice.actions;
export default dataSlice.reducer;
