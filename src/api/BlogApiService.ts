import axios, { Method, AxiosResponse } from 'axios';
import * as actions from '../store/serviceReducer';
import store from '../store/store';
import { Article, User } from '../types';

interface ServerResponse extends AxiosResponse {
  articles?: Article[];
  user?: User;
}
interface RequestHeaders {
  'Content-Type': 'application/json';
  Authorisation?: string;
}

const blogApi = async (
  url: string,
  method: Method = 'get',
  data: object | string | undefined = undefined,
  headers: RequestHeaders = { 'Content-Type': 'application/json' }
): Promise<ServerResponse> => {
  try {
    store.dispatch(actions.setLoading());
    const response = await axios.request<ServerResponse>({
      baseURL: 'https://conduit.productionready.io/api/',
      url,
      method,
      data,
      headers,
    });
    console.log(response.status);
    store.dispatch(actions.setNotLoading());
    return response.data;
  } catch (err) {
    console.log('Заглушка для ошибок - не забудь исправить', err.request);
    store.dispatch(actions.setNotLoading());
    return err.response;
  }
};

export default blogApi;
