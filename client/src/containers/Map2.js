import React, { Component, Fragment } from 'react';
import { isEmpty } from 'lodash';
import GoogleMap from '../components/GoogleMap';

const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
        bounds.extend(new maps.LatLng(
            place.location.coordinates[1],
            place.location.coordinates[0],
        ));
    });
    return bounds;
};

const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};

/* const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.street}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${4}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(4))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
    
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(4)}
      </div>
      
    </div>`; */

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.street}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        Date of Availabilty - 
        </span>
        <span style="color: orange;">${place.slots[0].slotDate}</span>
      </div>
    
      <div style="font-size: 14px;">
        <span style="color: grey;">
        Price - 
        </span>
        <span style="color: cornflowerblue; font-weight:bold;">$ ${place.slots[0].price}</span>
      </div>
      
    </div>`;

const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    const bounds = getMapBounds(map, maps, places);
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);

    places.forEach((place) => {
        console.log(place);
        let mx = new maps.Marker({
            position: {
                lat: place.location.coordinates[1],
                lng: place.location.coordinates[0],
            },
            map,
            label: {
                text: '$' + place.slots[0].price,
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
            },
            /* title: 'Yes' */
        })
        mx.show = true;
        markers.push(mx);

        let iw = new maps.InfoWindow({
            content: getInfoWindowString(place),
        });
        iw.show = true;
        infowindows.push(iw);
    });

    markers.forEach((marker, i) => {
        marker.addListener('click', () => {
            let iw = infowindows[i]['show'];

            if (iw) {
                infowindows[i].open(map, marker);
                infowindows[i]['show'] = false;
            }
            else {
                infowindows[i].close(map, marker)
                infowindows[i]['show'] = true;
            }
        });
    });
};

class GMap extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        const places = props.places || [];
        this.state = {
            places,
        };
    }

    componentDidMount() {
        /* fetch('places.json')
            .then(response => response.json())
            .then((data) => {
                data.results.forEach((result) => {
                    result.show = false; // eslint-disable-line no-param-reassign
                });
                this.setState({ places: data.results });
            }); */
        /* const places = [{ id: 1, name: 'First', show: false, price_level: 4, rating: 5, geometry: { location: { lat: 45.51, lng: -122.67 } } },
        { id: 2, name: 'Second', show: false, price_level: 4, rating: 5, geometry: { location: { lat: 45.31, lng: -122.51 } } },
        { id: 3, name: 'Third', show: false, price_level: 4, rating: 5, geometry: { location: { lat: 45.11, lng: -122.37 } } }];

        let place = undefined;
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                let place = {
                    id: 4,
                    name: 'Corvallis',
                    show: false,
                    price_level: 5,
                    rating: 4,
                    geometry: {
                        location: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    }
                }
                let x = place ? places.push(place) : '';
                this.setState({ places });
            }, (err) => {
                this.setState({ places });
            })
        } else {
            this.setState({ places });
        } */

    }

    render() {
        const { places } = this.state;

        return (
            <Fragment>
                {!isEmpty(places) && (
                    <GoogleMap
                        defaultZoom={10}
                        defaultCenter={[45.51, -122.67]}
                        bootstrapURLKeys={{ key: 'AIzaSyDiFYXE3HoT8ux5MqVFaeYLDLQcZvhAqqs' }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
                    />
                )}
            </Fragment>
        );
    }
}

export default GMap;