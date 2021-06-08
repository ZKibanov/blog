import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import RequestApiService from '../../api/RequestApiService';
import { manageUserToStore } from '../../utils';
import { useAppSelector } from '../../hooks';
import Articles from '../Articles/Articles';
import Header from '../Header/Header';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './App.css';
import 'antd/dist/antd.css';
import 'normalize.css';
import SingleArticle from '../SingleArticle/SingleArticle';
import Profile from '../Profile/Profile';
import ArticleForm from '../ArticleForm/ArticleForm';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App: FC = () => {
  const [cookie] = useCookies(['Autorization']);
  const userData = useAppSelector((state) => state.data.user);

  useEffect(() => {
    if (cookie.Authorization) {
      RequestApiService.fetchUser().then((response) => {
        if (response.user) {
          const { username, email, image } = response.user;
          manageUserToStore(username, email, image);
        }
      });
    }
  }, [cookie.Authorization]);
  return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/sign-up" component={SignUpForm} />
          <Route path="/sign-in" component={SignInForm} />
          <Route path="/articles" exact component={Articles} />
          <PrivateRoute path="/new-article">
            <ArticleForm />
          </PrivateRoute>

          <PrivateRoute path="/articles/:slug/edit">
            <ArticleForm />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Route path="/articles/:slug" exact component={SingleArticle} />

          <Route path="/" exact component={Articles} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;
