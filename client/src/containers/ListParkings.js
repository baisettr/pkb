import React, { Component } from 'react';
import { Button, ListSubheader } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


class ListParkings extends Component {
    constructor(props) {
        super(props)
    }
    handleBooking = (id, slotDate, slotPrice, slotAddr) => {
        const bookId = encodeURIComponent(id);
        const bookDate = encodeURIComponent(slotDate);
        const bookPrice = encodeURIComponent(slotPrice);
        const bookAddr = encodeURIComponent(slotAddr);
        this.props.history.push(`/book/${bookId}/${bookDate}/${bookPrice}/${bookAddr}`);
    }
    renderParkings() {
        return this.props.places.map(({ id, street, slotNo, slots }) => {
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
    renderGrid() {

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                margin: 'auto'
            }}>
                <GridList cellHeight={180} style={{ width: '500px', height: '450px' }}>
                    <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                        <ListSubheader component="div">{this.props.places.length ? <h4>List of Available Parkings</h4> : <h4>No Parkings Available! Try for a different City</h4>}</ListSubheader>
                    </GridListTile>
                    {this.props.places.map(({ id, street, slotNo, slots }) => {
                        const [slot] = slots;
                        return (
                            <GridListTile key={id} style={{ marginLeft: '10%', height: 'unset', width: 'fit-content' }}>
                                <div>
                                    <h4>{street}</h4>
                                    <p>Date - {slot.slotDate}, Price: ${slot.price}</p>
                                    <Button variant="outlined" onClick={this.handleBooking.bind(this, id, slot.slotDate, slot.price, street)}>Book</Button>
                                </div>
                            </GridListTile>
                        )
                    })}
                </GridList>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment >
                {this.renderGrid()}
            </React.Fragment>
        );
    }
}

export default withRouter(ListParkings);