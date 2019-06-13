import gql from 'graphql-tag';

export default gql`
mutation signup($email: String, $password: String, $firstName: String, $lastName: String) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      email
    }
  }
  
`;