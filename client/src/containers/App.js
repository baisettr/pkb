import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import '../styles/App.css';

import Login from './Login';
import Signin from './signinside';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import requireAuth from './requireAuth';

import Mat from './mat';
import AppBar from './AppBar';
import AddParking from './AddParking';
import SearchParkings from './SearchParkings';
import ViewParking from './ViewParking';
import BookParking from './BookParking';
import ViewBookings from './ViewBookings';


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
        <AppBar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={requireAuth(Home)} />

          <Route path="/add" component={requireAuth(AddParking)} />
          <Route path="/search" component={requireAuth(SearchParkings)} />
          <Route path="/view" component={requireAuth(ViewParking)} />
          <Route path="/bookings" component={requireAuth(ViewBookings)} />
          <Route path="/book/:id/:bookDate/:bookPrice/:bookAddr" component={requireAuth(BookParking)} />
          <Route path="/mat" component={Mat} />
        </Switch >
      </ApolloProvider>
    )
  }
}
export default withRouter(App);
