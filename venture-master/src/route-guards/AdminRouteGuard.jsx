import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserService } from '../services/user.service';

export const AdminRouteGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        UserService.isLogged() && UserService.isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname:
                UserService.isLogged() && UserService.isUser() ? '/user' : '/',
            }}
          />
        )
      }
    />
  );
};
