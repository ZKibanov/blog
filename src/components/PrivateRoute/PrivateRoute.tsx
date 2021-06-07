import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAppSelector } from '../../hooks';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const [cookie] = useCookies(['Autorization']);
  const userData = useAppSelector((state) => state.data.user);
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

export default PrivateRoute;
