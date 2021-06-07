import axios, { Method, AxiosResponse } from 'axios';
import { getCookie } from '../utils';
import * as actions from '../store/serviceReducer';
import store from '../store/store';
import { Article, User } from '../types';

export interface ServerResponse extends AxiosResponse {
  articles?: Article[];
  user?: User;
  article: Article;
}
interface RequestHeaders {
  'Content-Type': 'application/json';
  Authorization?: string;
}

const blogApi = async (
  url: string,
  method: Method = 'get',
  data: object | string | undefined = undefined,
  noLoadingIndication?: boolean
): Promise<ServerResponse> => {
  try {
    if (!noLoadingIndication) store.dispatch(actions.setLoading());
    const getHeaders = (): RequestHeaders => {
      const authToken = getCookie('Authorization');
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
      withCredentials: true,
    });
    if (!noLoadingIndication) store.dispatch(actions.setNotLoading());
    return response.data;
  } catch (err) {
    if (!noLoadingIndication) store.dispatch(actions.setNotLoading());
    return err.response;
  }
};

export default blogApi;
