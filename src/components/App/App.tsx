import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BlogApi from '../../api/BlogApiService';
import { manageUserToStore } from '../../utils';
import Articles from '../Articles/Articles';
import ArticleForm from '../ArticleForm/ArticleForm';
import Header from '../Header/Header';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './App.css';
import 'antd/dist/antd.css';
import 'normalize.css';
import SingleArticle from '../SingleArticle/SingleArticle';
import Profile from '../Profile/Profile';

const App: FC = () => {
  const [cookie] = useCookies(['Autorization']);
  useEffect(() => {
    if (cookie.Authorization) {
      BlogApi('user', 'get', undefined).then((response) => {
        if (response.user) {
          const { username, email, image } = response.user;
          manageUserToStore(username, email, image);
        }
      });
    }
  }, [cookie.Authorization]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/sign-in" component={SignInForm} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/new-article" component={ArticleForm} />
        <Route path="/profile" component={Profile} />

        <Route
          path="/articles/:slug"
          render={({ match, history, location }) => {
            console.log(match.params.slug);
            return <SingleArticle slug={match.params.slug} />;
          }}
        />
        <Route path="/" exact component={Articles} />
      </BrowserRouter>
    </>
  );
};

export default App;
