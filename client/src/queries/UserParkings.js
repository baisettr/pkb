import gql from 'graphql-tag';


export default gql`
{
  userParkings {
    id
    street
    slotNo
    slots {
      slotDate
      price
      status
    }
  }
}
`;