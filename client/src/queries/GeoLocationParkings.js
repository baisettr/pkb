import gql from 'graphql-tag';


export default gql`
query GeoLocationParkings ($lng:Float!, $lat:Float!) {
  geoLocationParkings(lng: $lng, lat: $lat) {
    id
    street
    slotNo
    slots {
      slotDate
      price
      status
    }
    location{
      coordinates
    }
    userId {
      firstName
    }
  }
}
`;