import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const REVIEWS = gql`
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

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS);
  const [thing, setThing] = useState(null);
  const [expandClicked, setExpandClicked] = useState(false);
  const d = data?.reviews?.data;

  useEffect(() => {
    if (d){
      console.log('teste')
      const projection = d.map((d) => (
        {
          Id: d.id,
          Title: d.attributes.Title,
          Description: d.attributes.Body,
          Rating: d.attributes.Rating,
          AbbreviatedDesc: d.attributes.Body.substring(0, 200),
          Expand: false,
          Categories: d.attributes.categories.data.map(c => (
            {
              Id: c.id,
              Name: c.attributes.Name
            }
          ))
        }
      ));
      setThing(projection);
    }
  }, [data]);


  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: :(</p>

  const handleDescriptionExpand = (e) => {
    console.log(thing[0])
    thing.find((r) => r.Id === e.target.value).Expand = !thing.find((r) => r.Id === e.target.value).Expand;
    setThing(thing)
    setExpandClicked(prev => !prev)
  }
  return (
    <div>
      {thing && thing.map(review => (
        
        <div key={review.Id} className="review-card">
          <div className="rating"><div className="rating-inner">{review.Rating}</div></div>
          <Link to={`/details/${review.Id}`}>
            <h2>{review.Title}</h2>
          </Link>
            {review.Categories.map(c => (
              <small key={c.Id}>{c.Name}</small>
            ))}
          {!review.Expand && 
            <>
              <ReactMarkdown>{review.AbbreviatedDesc}</ReactMarkdown>
              <button className="review-desc-button" onClick={handleDescriptionExpand} value={review.Id}>...</button>
            </>
          }
          
          {review.Expand && 
            <>
              <ReactMarkdown>{review.Description}</ReactMarkdown>
              <button className="review-desc-button" onClick={handleDescriptionExpand} value={review.Id}>^</button>
            </>
          }
          
          <Link to={`/details/${review.Id}`}>Read More</Link>
        </div>
      ))}
    </div>
  )
}
