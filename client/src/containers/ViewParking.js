import React, { Component } from 'react';
import query from '../queries/UserParkings';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


class ViewParking extends Component {
    constructor(props) {
        super(props);
    }
    renderParkings() {
        let userParkings = this.props.data.userParkings || [];
        return userParkings.map(({ id, street, slotNo, slots }) => {
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
                <Button type="submit" variant="outlined" style={{ margin: '10px', color: "white", backgroundColor: "black" }}>

                    <Link to="/add" style={{ color: "white", textDecoration: 'none' }}>Add Parking</Link>
                </Button>
                <h4>List of User Parkings</h4>
                <ul >
                    {this.renderParkings()}
                </ul>
            </div>
        );
    }
}

export default graphql(query)(ViewParking);