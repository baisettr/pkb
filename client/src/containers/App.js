import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import '../styles/App.css';

import SignIn from './SignIn';
import Home from './Home';
import Dashboard from './Dashboard';
import requireAuth from './requireAuth';

import AppBar from './AppBar';
import NavBar from './NavBar';
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
          <Route path="/login" component={SignIn} />
          <Route path="/home" component={requireAuth(Home)} />

          <Route path="/add" component={requireAuth(AddParking)} />
          <Route path="/search" component={SearchParkings} />
          <Route path="/view" component={requireAuth(ViewParking)} />
          <Route path="/bookings" component={requireAuth(ViewBookings)} />
          <Route path="/book/:bookId/:bookDate/:bookPrice/:bookAddr" component={requireAuth(BookParking)} />
        </Switch >
      </ApolloProvider>
    )
  }
}
export default withRouter(App);
