import React, { Component } from 'react';
import query from '../queries/UserBookings';
import { graphql } from 'react-apollo';
import { Button, Link } from '@material-ui/core';


class ViewBookings extends Component {
    constructor(props) {
        super(props);
    }
    renderBookings() {
        return this.props.data.userBookings.map(({ id, bookingDate, parkingId, bookingStatus }) => {
            const { street, userId } = parkingId;
            const parkingOwner = userId['name'];
            return (
                <li key={id} >
                    <h4>{street}</h4>
                    <p>Date - {bookingDate}, Status: {bookingStatus ? bookingStatus : "Unknown"}</p>
                    <p>Owner Details - {parkingOwner}</p>
                </li>
            );
        });
    }
    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }

        return (
            <div style={{ margin: "100px", alignContent: "center" }}>
                <h4>List of User User Bookings</h4>
                <ul >
                    {this.renderBookings()}
                </ul>
            </div>
        );
    }
}

export default graphql(query)(ViewBookings);