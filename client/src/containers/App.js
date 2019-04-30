import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import '../styles/App.css';

import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import requireAuth from './requireAuth';

/* const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
  })
}); */

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  uri: '/graphql',
  credentials: 'same-origin'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={requireAuth(Home)} />
        </Switch >
      </ApolloProvider>
    )
  }
}
export default withRouter(App);
