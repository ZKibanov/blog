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
  Authorization?: string;
}

const blogApi = async (
  url: string,
  method: Method = 'get',
  data: object | string | undefined = undefined,
  authToken: string | undefined = undefined
): Promise<ServerResponse> => {
  try {
    store.dispatch(actions.setLoading());
    const getHeaders = (): RequestHeaders => {
      if (authToken) {
        return {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        };
      }
      return { 'Content-Type': 'application/json' };
    };
    const response = await axios.request<ServerResponse>({
      baseURL: 'https://conduit.productionready.io/api/',
      url,
      method,
      data,
      headers: getHeaders(),
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
