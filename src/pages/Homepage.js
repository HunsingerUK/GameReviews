import React from 'react'
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import config from '../config/config.json'

export default function Homepage() {
  const { apiEndpoints } = config;
  const { loading, error, data } = useFetch(apiEndpoints.reviews);
  const [thing, setThing] = useState(data);
  const [expandClicked, setExpandClicked] = useState(false);

  useEffect(() => {
    if (!loading){
      data.forEach(element => {
        element.attributes.Expand = false;
        element.attributes.AbbreviatedBody = `${element.attributes.Body.substring(0,200)}`;
      });
    }
    setThing(data);
  }, [loading]);

  useEffect(() => {
    setThing(thing)
    setExpandClicked((prev) => !prev);
  }, [thing?.attributes?.Expand])

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: :(</p>

  const handleDescriptionExpand = (e) => {
    thing.find((r) => r.id === +e.target.value).attributes.Expand = !thing.find((r) => r.id === +e.target.value).attributes.Expand;
    setThing(thing)
    setExpandClicked(prev => !prev)
  }

  return (
    <div>
      {thing && thing.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating"><div className="rating-inner">{review.attributes.Rating}</div></div>
          <Link to={`/details/${review.id}`}>
            <h2>{review.attributes.Title}</h2>
          </Link>
          <small>Console List</small>
          {!review.attributes.Expand && 
            <p>{review.attributes.AbbreviatedBody}<button className="review-desc-button" onClick={handleDescriptionExpand} value={review.id}>...</button></p>
          }
          
          {review.attributes.Expand && 
            <p>{review.attributes.Body}<button className="review-desc-button" onClick={handleDescriptionExpand} value={review.id}>^</button></p>
          }
          
          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  )
}
