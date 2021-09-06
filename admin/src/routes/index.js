import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = (props) => {
  const { match, authUser } = props
  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route path={`${match.url}creators`} component={asyncComponent(() => import('./Creators'))}/>
        <Route path={`${match.url}users`} component={asyncComponent(() => import('./Users'))}/>
        <Route path={`${match.url}creator/:userid`} component={asyncComponent(() => import('./Creators/EditUser'))}/>
        <Route path={`${match.url}user/:userid`} component={asyncComponent(() => import('./Users/EditUser'))}/>
        <Route path={`${match.url}projects`} component={asyncComponent(() => import('./Projects'))}/>
        <Route path={`${match.url}ads`} component={asyncComponent(() => import('./Ads'))}/>
      </Switch>
    </div>
  )
}

export default App;
