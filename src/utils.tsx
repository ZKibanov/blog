import store from './store/store';
import { updateUserInStore } from './store/dataReducer';

export const manageUserToStore = (
  username: string,
  email: string,
  image: string | undefined = undefined
) => {
  store.dispatch(updateUserInStore({ username, email, image }));
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
