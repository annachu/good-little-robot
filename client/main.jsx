import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, IndexRoute, Link, browserHistory } from 'react-router'

import App from '../imports/ui/App.jsx'
import Track from '../imports/ui/Track.jsx'
import Report from '../imports/ui/Report.jsx'
import Clients from '../imports/ui/Clients.jsx'
import Projects from '../imports/ui/Projects.jsx'
import ManagePeople from '../imports/ui/ManagePeople.jsx'
import NotFound from '../imports/ui/NotFound.jsx'

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/track"/>
        <Route path="track" component={Track}/>
        <Route path="report" component={Report}/>
        <Route path="manage">
          <IndexRoute component={NotFound}/>
          <Route path="projects" component={Projects}/>
          <Route path="people" component={ManagePeople}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  ), document.getElementById('reactify'))
})
