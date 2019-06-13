import React, { Component } from 'react';
import query from '../queries/GeoLocationParkings';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ListParkings from './ListParkings';
import GMap from './Map2';


class HandleParkings extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }

        return (
            <React.Fragment >
                {this.props.data.geoLocationParkings ?
                    [
                        <ListParkings key={1} places={this.props.data.geoLocationParkings} />,
                        <GMap key={2} places={this.props.data.geoLocationParkings} />
                    ]
                    : ""}
            </React.Fragment>
        );
    }
}

export default graphql(query, {
    options: (props) => { return { variables: { lng: props.lng, lat: props.lat }, fetchPolicy: 'network-only' } } //props.state
})(withRouter(HandleParkings));