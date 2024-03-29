import blogApi, { ServerResponse } from './BlogApiService';

interface UserInfo {
  user: {
    password: string;
    email: string;
    username: string;
  };
}

interface ArticleInfo {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

/* eslint-disable class-methods-use-this */

class RequestApiService {
  async signUp(userInfo: UserInfo): Promise<ServerResponse> {
    return blogApi('users', 'POST', userInfo);
  }

  async addToFavourites(slug: string): Promise<ServerResponse> {
    return blogApi(`/articles/${slug}/favorite`, 'POST', undefined, true);
  }

  async removeFromFavourites(slug: string): Promise<ServerResponse> {
    return blogApi(`/articles/${slug}/favorite`, 'DELETE', undefined, true);
  }

  async fetchArticles(page: number): Promise<ServerResponse> {
    return blogApi(`articles?offset=${(page - 1) * 5}`);
  }

  async fetchSingleArticle(slug: string): Promise<ServerResponse> {
    return blogApi(`articles/${slug}`);
  }

  async deleteArticle(slug: string): Promise<ServerResponse> {
    return blogApi(`articles/${slug}`, 'DELETE');
  }

  async addArticle(newArticle: ArticleInfo): Promise<ServerResponse> {
    return blogApi('articles', 'post', newArticle);
  }

  async editArticle(
    slug: string,
    newArticle: ArticleInfo
  ): Promise<ServerResponse> {
    return blogApi(`articles/${slug}`, 'put', newArticle);
  }

  async fetchUser(): Promise<ServerResponse> {
    return blogApi('user', 'get');
  }

  async editUser(userInfo: UserInfo): Promise<ServerResponse> {
    return blogApi('user', 'PUT', userInfo);
  }
}

export default new RequestApiService();
