import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserService } from '../services/user.service';

export const UserRouteGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        UserService.isLogged() && UserService.isUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname:
                UserService.isLogged() && UserService.isAdmin()
                  ? '/badges'
                  : '/',
            }}
          />
        )
      }
    />
  );
};
