import React, { useMemo } from 'react';

// import redux for auth guard
import { useSelector } from 'react-redux';

// import layout

import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isAuthenticated, userRole: user?.role }), [isAuthenticated, user]);
  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    );
  }
  return <></>;
};

export default App;
