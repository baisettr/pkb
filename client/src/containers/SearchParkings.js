import React, { Component } from 'react';
import query from '../queries/LocationParkings';
import { graphql } from 'react-apollo';
import { Button, Link, TextField } from '@material-ui/core';
import ListParkings from './ListParkings';


class SearchParking extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", state: "", retrieve: false };
    }
    getListings = (e) => {
        e.preventDefault();
        this.setState({ retrieve: true })
    }

    render() {
        return (
            <div style={{ margin: "100px", alignContent: "center" }}>
                <h4 style={{ textAlign: "centers" }}>Search Available Parkings in a City</h4>
                <div style={{ display: "flexs", justifyContent: "center" }}>
                    <form onSubmit={this.getListings.bind(this)}>
                        <TextField
                            required
                            style={{ margin: '10px' }}
                            id="home-address"
                            value={this.state.city}
                            onChange={(e) => { this.setState({ city: e.target.value, retrieve: false }) }}
                            label="Enter City" //use google places split set 
                        />
                        <TextField
                            required
                            style={{ margin: '10px' }}
                            id="hom-address"
                            value={this.state.state}
                            onChange={(e) => { this.setState({ state: e.target.value, retrieve: false }) }}
                            label="Enter State"
                        />
                        <br />
                        <Button type="submit" variant="outlined" style={{ margin: '10px', color: "white", backgroundColor: "black" }}>
                            Search
                        </Button>
                    </form>
                </div>
                {this.state.retrieve ? <ListParkings city={this.state.city} state={this.state.state} /> : ""}
            </div >
        );
    }
}

export default graphql(query, {
    options: (props) => { return { variables: { city: "Corvallis", state: "OR" } } } //props.state
})(SearchParking);