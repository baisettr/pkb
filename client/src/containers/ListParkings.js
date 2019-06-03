import React, { Component } from 'react';
import query from '../queries/LocationParkings';
import { graphql } from 'react-apollo';
import { Button, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


class ListParkings extends Component {
    constructor(props) {
        super(props);
    }
    handleBooking = (id, slotDate, slotPrice, slotAddr) => {
        const bookId = encodeURIComponent(id);
        const bookDate = encodeURIComponent(slotDate);
        const bookPrice = encodeURIComponent(slotPrice);
        const bookAddr = encodeURIComponent(slotAddr);
        this.props.history.push(`/book/${bookId}/${bookDate}/${bookPrice}/${bookAddr}`);
    }
    renderParkings() {
        return this.props.data.locationParkings.map(({ id, street, slotNo, slots }) => {
            const [slot] = slots;
            return (
                <li key={id} >
                    <h4>{street}</h4>
                    <p>Date - {slot.slotDate}, Price: ${slot.price}</p>
                    <Button variant="outlined" onClick={this.handleBooking.bind(this, id, slot.slotDate, slot.price, street)}>Book</Button>
                </li>
            );
        });
    }
    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }

        return (
            <div style={{ margin: "100px", alignContent: "center" }}>
                {this.props.data.locationParkings.length ? <h4>List of Available Parkings</h4> : <h4>No Parkings Available! Try for a different City</h4>}
                <ul >
                    {this.renderParkings()}
                </ul>
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => { return { variables: { city: props.city, state: props.state } } } //props.state
})(withRouter(ListParkings));