import gql from 'graphql-tag';

export default gql`
mutation AddParking($slotNo: String, $street: String, $city: String, $state: String, $zip: Int, $slots: [SlotInput]) {
  addParking(slotNo: $slotNo, street: $street, city: $city, state: $state, zip: $zip, slots: $slots) {
    id
  }
}
`;