import React, { FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Articles from '../Articles/Articles';
import Header from '../Header/Header';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './App.css';
import 'antd/dist/antd.css';
import 'normalize.css';
import SingleArticle from '../SingleArticle/SingleArticle';

const App: FC = () => (
  <>
    <BrowserRouter>
      <Header />
      <Route path="/sign-up" component={SignUpForm} />
      <Route path="/sign-in" component={SignInForm} />
      <Route path="/articles" exact component={Articles} />
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

export default App;
