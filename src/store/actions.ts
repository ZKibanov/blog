import {
  ArticleActionTypes,
  UserActionTypes,
  UPDATE_ARTICLES,
  SET_FETCHING_ERROR,
  ArticleData,
  ErrorHttpAction,
  UPDATE_USER_IN_STORE,
  User,
} from "../types";

export function UpdateArticles(payload: ArticleData): ArticleActionTypes {
  return {
    type: UPDATE_ARTICLES,
    payload,
  };
}

export function SetFetchingError(payload: ErrorHttpAction): ArticleActionTypes {
  return {
    type: SET_FETCHING_ERROR,
    error: true,
    payload,
  };
}

export function UpdateUser(payload: User): UserActionTypes {
  return {
    type: UPDATE_USER_IN_STORE,
    payload,
  };
}
