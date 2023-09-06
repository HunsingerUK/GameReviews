import { gql } from '@apollo/client'

export const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id,
        attributes {
          Title,
          Body,
          Rating,
          categories {
            data {
              id,
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

export const REVIEW = gql`
query GetReview($id: ID!) { 
  review(id: $id) {
    data {
      id,
      attributes {
        Title,
        Body,
        Rating,
        categories {
          data {
            id,
            attributes {
              Name
            }
          }
        }
      }
    }
  }
}
`;

export const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id,
        attributes {
          Name
        }
      }
    }
  }
`

export const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id,
        attributes {
          Name,
          reviews {
            data {
              id,
              attributes {
                Title,
                Rating,
                Body,
                categories {
                  data {
                    id,
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;