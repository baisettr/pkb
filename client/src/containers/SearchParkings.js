import React, { Component } from 'react';
import { Button, Link, TextField } from '@material-ui/core';
import HandleParkings from './HandleParkings';

import Select from '../components/Select';


class SearchParking extends Component {
    constructor(props) {
        super(props);
        this.state = { error: "", city: "", state: "", retrieve: false, lat: undefined, lng: undefined };
    }
    getListings = (e) => {
        e.preventDefault();
        this.setState({ retrieve: true })
    }
    async fetchGeometry(place_id) {
        return new Promise((resolve, reject) => {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place_id + '&fields=name,geometry&key=' + 'AIzaSyDiFYXE3HoT8ux5MqVFaeYLDLQcZvhAqqs';
            fetch(proxyUrl + url)
                .then(response => response.json())
                .then(data => {
                    resolve(data.result.geometry.location)
                });
        })
    }

    handleHomeAddrChange = async (geometry) => {
        //console.log(geometry);
        if (geometry.place_id) {
            const { place_id, homeAddr } = geometry;
            const { lat, lng } = await this.fetchGeometry(place_id);
            this.setState({ lat, lng, error: "" })
        }
        else {
            this.setState({ error: "Invalid Address", retrieve: false })
        }

    }

    render() {
        return (
            <div>
                <div >
                    <form onSubmit={this.getListings.bind(this)} style={{ display: "flex", justifyContent: "center" }}>
                        {/* <TextField
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
                        /> */}
                        <Select handleHomeAddrChange={this.handleHomeAddrChange} />
                        <Button type="submit" variant="outlined" style={{ margin: '20px', color: "white", backgroundColor: "black" }}>
                            Search
                        </Button>
                    </form>
                </div>
                {this.state.retrieve && !this.state.error ?
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <HandleParkings lng={this.state.lng} lat={this.state.lat} />
                    </div>
                    : ""}
            </div>
        );
    }
}

export default SearchParking;