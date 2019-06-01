import React, { Component } from 'react';
import { Button, Switch, Grid, Typography, TextField, InputAdornment, FormHelperText } from '@material-ui/core';

class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = { error: "" };
    }
    handleAddParking = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <div style={{ margin: "100px", alignContent: "center" }}>
                <h4 style={{ textAlign: "center" }}>Add a Parking Slot</h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <form onSubmit={this.handleAddParking.bind(this)}>

                        <TextField
                            required
                            style={{ margin: '10px', width: '100%' }}
                            id="home-address"
                            value=""
                            label="Enter the home address"
                        />
                        <TextField
                            required
                            style={{ margin: '10px' }}
                            id="hom-address"
                            value=""
                            label="Parking Slot No/Ref"
                        />
                        <TextField
                            required
                            style={{ margin: '10px' }}
                            id="hom-address"
                            type="number"
                            label="Price"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ margin: '10px' }}
                            id="date"
                            label="Pick the Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Typography component="div" style={{ padding: '10px' }}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Single Date</Grid>
                                <Grid item>
                                    <Switch />
                                </Grid>
                                <Grid item>Multiple Dates</Grid>
                            </Grid>
                        </Typography>
                        <Button type="submit" variant="outlined" color="green" style={{ margin: '10px', color: "white", backgroundColor: "black" }}>
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddParking;