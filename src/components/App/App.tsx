import React, { FC,ReactChild,ReactNode, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import BlogApi from "../../api/BlogApiService";
import { manageUserToStore } from "../../utils";
import { useAppSelector } from "../../hooks";
import Articles from "../Articles/Articles";
import ArticleForm from "../ArticleForm/ArticleForm";
import Header from "../Header/Header";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import "./App.css";
import "antd/dist/antd.css";
import "normalize.css";
import SingleArticle from "../SingleArticle/SingleArticle";
import Profile from "../Profile/Profile";

const App: FC = () => {
  const [cookie] = useCookies(["Autorization"]);
  const userData = useAppSelector((state) => state.data.user);

  interface PrivateRouteProps{
    children?:ReactChild,
    path: string,
  }

const PrivateRoute:FC<PrivateRouteProps>=({ children, ...rest }) => {
  const auth = userData;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

  useEffect(() => {
    if (cookie.Authorization) {
      BlogApi("user", "get", undefined).then((response) => {
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

        <PrivateRoute path="/new-article">
        <ArticleForm />
          </PrivateRoute> 

        <Route path="/profile" component={Profile} />

        <Route
          path="/articles/:slug"
          exact
          render={({ match, history, location }) => {
            console.log(match.params.slug);
            const {slug} = match.params
            return <SingleArticle slug={slug} />;
          }}
        />

<PrivateRoute path="/articles/:slug/edit">
        <Route
        path="/articles/:slug/edit"
        render={({ match, history, location }) => {
            const {slug} = match.params
            return <ArticleForm slug={slug}/>;
        }}
        />
          </PrivateRoute> 
        <Route path="/" exact component={Articles} />
      </BrowserRouter>
    </>
  );
};

export default App;
