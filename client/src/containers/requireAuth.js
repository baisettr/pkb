import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import query from '../queries/User';
import { withRouter } from 'react-router-dom';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.user) {
                //this.props.client.cache.reset();
                this.props.history.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(query)(withRouter(RequireAuth));
};