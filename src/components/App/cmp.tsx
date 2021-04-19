import {
  ArticleActionTypes,
  UPDATE_ARTICLES,
  SET_FETCHING_ERROR,
  ArticleData,
  ErrorHttpAction,
} from "../../types";

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
