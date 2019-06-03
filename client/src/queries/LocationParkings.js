import gql from 'graphql-tag';


export default gql`
query LocationParkings ($city:String!, $state:String!) {
  locationParkings(city: $city, state: $state) {
    id
    street
    slotNo
    slots {
      slotDate
      price
      status
    }
    userId {
      name
    }
  }
}
`;