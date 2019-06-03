import React, { Component } from 'react';
import query from '../queries/UserParkings';
import { graphql } from 'react-apollo';
import { Button, Link } from '@material-ui/core';


class ViewParking extends Component {
    constructor(props) {
        super(props);
    }
    renderParkings() {
        return this.props.data.userParkings.map(({ id, street, slotNo, slots }) => {
            const [slot] = slots;
            return (
                <li key={id} >
                    <h4>{street}</h4>
                    <p>Date - {slot.slotDate}, Price: ${slot.price}, Status: {slot.status ? "Available" : "Booked"}</p>
                </li>
            );
        });
    }
    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }

        return (
            <div style={{ margin: "100px", alignContent: "center" }}>
                <h4>List of User Parkings</h4>
                <ul >
                    {this.renderParkings()}
                </ul>
            </div>
        );
    }
}

export default graphql(query)(ViewParking);