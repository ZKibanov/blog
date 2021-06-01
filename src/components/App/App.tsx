import React, { FC, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BlogApi from '../../api/BlogApiService';
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
import NewArticle from '../ArticleForm/ArticleForm';

const App: FC = () => {
  const [cookie] = useCookies(['Autorization']);
  const userData = useAppSelector((state) => state.data.user);

  const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const auth = cookie.Authorization || userData;
    return (
      <Route
        exact
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

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
        <Switch>
          <Route path="/sign-up" component={SignUpForm} />
          <Route path="/sign-in" component={SignInForm} />
          <Route path="/articles" exact component={Articles} />
          <PrivateRoute path="/new-article">
            <NewArticle />
          </PrivateRoute>

          <PrivateRoute path="/articles/:slug/edit">
            <NewArticle />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Route
            path="/articles/:slug"
            exact
            render={({ match, history, location }) => {
              const { slug } = match.params;
              return <SingleArticle slug={slug} />;
            }}
          />

          <Route path="/" exact component={Articles} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
