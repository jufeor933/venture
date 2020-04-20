import React, { useEffect, useState } from 'react';
import { UserService } from '../services/user.service';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserRouteGuard } from '../route-guards/UserRouteGuard';
import { AdminRouteGuard } from '../route-guards/AdminRouteGuard';
import constants from '../common/constans';

import Layout from './Layout';
import BadgeNew from '../pages/BadgeNew';
import Badges from '../pages/Badges';
import NotFound from '../pages/NotFound';
import Principal from '../pages/Principal';
import User from '../pages/User';
import Status from '../pages/Status';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      const user = localStorage.getItem(constants.USER_LOCAL_KEY);
      if (user) {
        await UserService.autologin(user);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);
  return (
    <BrowserRouter>
      {!loading && (
        <Layout>
          <Switch>
            <Switch>
              <Route exact path="/" component={Principal} />
              {/* admin routes */}
              <AdminRouteGuard exact path="/badges" component={Badges} />
              {/* user routes */}
              <UserRouteGuard exact path="/badges/new" component={BadgeNew} />
              <UserRouteGuard exact path="/user" component={User} />
              <UserRouteGuard exact path="/statusTicket" component={Status} />
              <Route component={NotFound} />
            </Switch>
          </Switch>
        </Layout>
      )}
    </BrowserRouter>
  );
};

export default App;
