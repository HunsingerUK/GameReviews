import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom';

const REVIEW = gql`
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

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  });
  const [review, setReview] = useState(null);
  const d = data?.review?.data;

  useEffect(() => {
    if (d) {
      const projection = {
        Id: d.id,
        Title: d.attributes.Title,
        Description: d.attributes.Body,
        Rating: d.attributes.Rating,
        Categories: d.attributes.categories.data.map(c => (
          {
            Id: c.id,
            Name: c.attributes.Name
          }
        ))
      };
    setReview(projection);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: :(</p>

  return (
    <div>
      {review &&
          <div className="review-card">
            <div className="rating"><div className="rating-inner">{review.Rating}</div></div>
            <h2>{review.Title}</h2>
            {review.Categories.map(c => (
              <small key={c.Id}>{c.Name}</small>
            ))}
            <p>{review.Description}</p>
          </div>
      }
    </div>
  )
}
