import gql from 'graphql-tag';


export default gql`
{
  userBookings {
    id
    bookingDate
    parkingId {
      id
      street
      userId{
        firstName
      }
    }
    bookingStatus
  }
}
`;