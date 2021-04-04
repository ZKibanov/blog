import store from './store/store';
import { updateUserInStore } from './store/dataReducer';

export const manageUserToStore = (username: string, email: string) => {
  store.dispatch(updateUserInStore({ username, email }));
};
