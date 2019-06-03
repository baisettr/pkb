import gql from 'graphql-tag';

export default gql`
mutation AddBooking($bookingDate: date, $parkingId: String) {
  addBooking(bookingDate: $bookingDate, parkingId: $parkingId) {
    id
  }
}
`;