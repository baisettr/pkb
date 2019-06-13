import React, { Component } from 'react';
import query from '../queries/UserBookings';
import mutation from '../mutations/AddBooking';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

class BookParking extends Component {
    constructor(props) {
        super(props);
        //console.log(props.match.params);
        const parkingId = decodeURIComponent(props.match.params.bookId);
        const bookingDate = decodeURIComponent(props.match.params.bookDate);
        const bookingPrice = decodeURIComponent(props.match.params.bookPrice);
        const parkingAddr = decodeURIComponent(props.match.params.bookAddr);
        this.state = { error: "", paymentDetails: "", bookingDate, bookingPrice, parkingId, parkingAddr };
    }
    handleAddBooking = (e) => {
        e.preventDefault();
        const bookingDate = this.state.bookingDate;
        const parkingId = this.state.parkingId;
        // other details 

        this.props.mutate({
            variables: { bookingDate, parkingId },
            refetchQueries: [{ query }]
        }).then((res) => {
            this.props.history.push('/bookings');
        }).catch((res) => {
            const errors = res.graphQLErrors.map(e => e.message);
            const error = JSON.stringify(errors);
            this.setState({ error });
        })

    }
    render() {
        return (
            <div style={{ margin: "100px", alignContent: "center", textAlign: "center" }}>
                <h4 style={{}}>Booking Details</h4>
                <p style={{ color: 'red' }}>{this.state.error}</p>
                <p> Parking Address - {this.state.parkingAddr}, Parking Date - {this.state.bookingDate}</p>
                <h4> Price - ${this.state.bookingPrice}</h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <form onSubmit={this.handleAddBooking.bind(this)}>
                        <TextField
                            required
                            style={{ margin: '10px', width: '100%' }}
                            id="home-address"
                            value={this.state.paymentDetails}
                            onChange={(e) => { this.setState({ paymentDetails: e.target.value }) }}
                            label="Enter the payment details" //use google places split set 
                        />
                        <br />
                        <Button type="submit" variant="outlined" style={{ margin: '10px', color: "white", backgroundColor: "black" }}>
                            Confirm Booking
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default graphql(mutation)(withRouter(BookParking));