import React, { Component } from 'react';
import { Button, Switch, Grid, Typography, TextField, InputAdornment, FormHelperText } from '@material-ui/core';
import mutation from '../mutations/AddParking';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/UserParkings';

import Select from '../components/Select';

class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = { error: "", homeAddr: "", slotNo: "", location: undefined, price: 0, parkingDate: undefined, suggestedPlaces: ['New York, USA', 'San Francisco, USA', 'Florida, USA', 'Portland, USA'] };
    }
    handleAddParking = async (e) => {
        e.preventDefault();
        const slotDate = this.state.parkingDate;
        const status = true;
        const price = parseFloat(this.state.price);
        const slotNo = this.state.slotNo;
        const street = this.state.homeAddr;
        const city = "Corvallis";
        const state = "OR";
        const zip = 97330;
        const slot = { slotDate, status, price };
        const slots = [slot]
        const location = this.state.location;
        if (!this.state.error) {
            this.props.mutate({
                variables: { slotNo, street, city, state, zip, slots, location },
                refetchQueries: [{ query }]
            }).then((res) => {
                this.props.history.push('/view');
            }).catch((res) => {
                const errors = res.graphQLErrors.map(e => e.message);
                const error = JSON.stringify(errors);
                this.setState({ error });
            })
        }

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

            const location = {
                type: "Point",
                coordinates: [lng, lat]
            }
            //console.log(location, homeAddr);
            this.setState({ location, homeAddr, error: "" })
        } else {
            this.setState({ error: 'Invalid Address' })
        }

    }

    render() {
        return (
            <div style={{ margin: "100px", alignContent: "center" }}>
                <h4 style={{ textAlign: "center" }}>Add a Parking Slot</h4>
                <p style={{ color: 'red', textAlign: "center" }}>{this.state.error}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <form onSubmit={this.handleAddParking.bind(this)}>

                        {/* <TextField
                            required
                            style={{ margin: '10px', width: '100%' }}
                            id="home-address"
                            value={this.state.homeAddr}
                            onChange={(e) => { this.setState({ homeAddr: e.target.value }) }}
                            label="Enter the home address" //use google places split set 
                            list="data"
                        /> */}
                        <Select handleHomeAddrChange={this.handleHomeAddrChange} />
                        <TextField
                            required
                            style={{ margin: '10px' }}
                            id="hom-address"
                            value={this.state.slotNo}
                            onChange={(e) => { this.setState({ slotNo: e.target.value }) }}
                            label="Parking Slot No/Ref"
                        />
                        <TextField
                            required
                            style={{ margin: '10px' }}
                            id="hom-address"
                            type="number"
                            label="Price"
                            value={this.state.price}
                            onChange={(e) => { this.setState({ price: e.target.value }) }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ margin: '10px' }}
                            id="date"
                            label="Pick the Date"
                            type="date"
                            value={this.state.undefined}
                            onChange={(e) => { this.setState({ parkingDate: e.target.value }) }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/*  <Typography component="div" style={{ padding: '10px' }}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Single Date</Grid>
                                <Grid item>
                                    <Switch />
                                </Grid>
                                <Grid item>Multiple Dates</Grid>
                            </Grid>
                        </Typography> */}
                        <br />
                        <Button type="submit" variant="outlined" style={{ margin: '10px', color: "white", backgroundColor: "black" }}>
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default graphql(mutation)(withRouter(AddParking));