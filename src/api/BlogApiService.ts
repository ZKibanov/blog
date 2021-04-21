import axios, { Method, AxiosResponse } from "axios";
import { getCookie } from "../utils";
import * as actions from "../store/serviceReducer";
import store from "../store/store";
import { Article, User } from "../types";

interface ServerResponse extends AxiosResponse {
  articles?: Article[];
  user?: User;
  article: Article;
}
interface RequestHeaders {
  "Content-Type": "application/json";
  Authorization?: string;
}

const blogApi = async (
  url: string,
  method: Method = "get",
  data: object | string | undefined = undefined
): Promise<ServerResponse> => {
  console.log(data);

  try {
    store.dispatch(actions.setLoading());
    const getHeaders = (): RequestHeaders => {
      const authToken = getCookie("Authorization");
      if (authToken) {
        return {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        };
      }
      return { "Content-Type": "application/json" };
    };
    const response = await axios.request<ServerResponse>({
      baseURL: "https://conduit.productionready.io/api/",
      url,
      method,
      data,
      headers: getHeaders(),
      withCredentials: true,
    });
    store.dispatch(actions.setNotLoading());
    return response.data;
  } catch (err) {
    console.log("Заглушка для ошибок - не забудь исправить", err.request);
    store.dispatch(actions.setNotLoading());
    return err.response;
  }
};

export const blogApiWithoutLoadingIndication = async (
  url: string,
  method: Method = "get",
  data: object | string | undefined = undefined
): Promise<ServerResponse> => {
  console.log(data);
  try {
    const getHeaders = (): RequestHeaders => {
      const authToken = getCookie("Authorization");
      if (authToken) {
        return {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        };
      }
      return { "Content-Type": "application/json" };
    };
    const response = await axios.request<ServerResponse>({
      baseURL: "https://conduit.productionready.io/api/",
      url,
      method,
      data,
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log("Заглушка для ошибок - не забудь исправить", err.request);
    return err.response;
  }
};

export default blogApi;
