// заюзал и скопировал type Article = ReturnType<typeof data>;

export type Article = {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList?: string[];
  description: string;
  author: {
    username: string;
    bio?: null;
    image?: string;
    following?: boolean;
  };
  favorited: boolean;
  favoritesCount: number;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  bio: null | string;
  image: null | string;
  token: string;
};

export interface ArticleData {
  articles: Article[];
  articlesCount: number;
}

export type ErrorHttpAction = {
  status: number;
};

export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
type UpdateArticles = {
  type: typeof UPDATE_ARTICLES;
  payload: ArticleData;
};

export const UPDATE_USER_IN_STORE = 'UPDATE_USER_IN_STORE';
type UpdateUserInStore = {
  type: typeof UPDATE_USER_IN_STORE;
  payload: User;
};

export const SET_FETCHING_ERROR = 'SET_FETCHING_ERROR';
type SetFetchingError = {
  type: typeof SET_FETCHING_ERROR;
  error: true;
  payload: ErrorHttpAction;
};

export const UPDATE_ARTICLES_ASYNC = 'UPDATE_ARTICLES_ASYNC';
type UpdateArticlesAsync = {
  type: typeof UPDATE_ARTICLES_ASYNC;
  payload: ArticleData;
};

export type ArticleActionTypes =
  | UpdateArticles
  | SetFetchingError
  | UpdateArticlesAsync;

export type UserActionTypes = UpdateUserInStore;
