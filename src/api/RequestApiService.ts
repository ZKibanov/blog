import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import blogApi  from './BlogApiService';
import ErrorIndicator from '../components/ErrorIndicator/ErrorIndicator';
import { manageUserToStore } from '../utils';
import { Article, User } from '../types';

interface UserInfo {
    user:{
    password: string;
    email: string;
    username: string;
    }
  }

class RequestApiService{
    /* eslint-disable-next-line */
    signUp(userInfo:UserInfo){
    blogApi('users', 'POST', userInfo).then((response) => {
        const [, setCookie, removeCookie] = useCookies(['Token']);
        const history = useHistory();
        if (response.status === 422) {
          const errorDetails = response.data.errors;
          ErrorIndicator(errorDetails);
        }
        if (response.user) {
          const { username, email, token, image } = response.user;
          setCookie('Authorization', token, { secure: true });
          manageUserToStore(username, email, image);
          history.push('/');
        }
      })
    }
}

export default new RequestApiService;