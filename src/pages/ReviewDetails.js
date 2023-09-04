import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch'
import config from '../config/config.json'

export default function ReviewDetails() {
  const { id } = useParams();
  const { apiEndpoints } = config;
  const { loading, error, data } = useFetch(`${apiEndpoints.reviewDetails}/${id}`);
  const [review, setReview] = useState(null);

  useEffect(() => {
    if (!loading && data) {
      setReview(data);
    }
  },[data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: :(</p>

  return (
    <div>      
      {/* either of these two styles work */}
      {/* {!loading &&
          <div className="review-card">
            <div className="rating"><div className="rating-inner">{data.attributes.Rating}</div></div>
            <h2>{data.attributes.Title}</h2>
            <small>Console List</small>
            <p>{data.attributes.Body}</p>
          </div>
      } */}

      {review && 
        <div className="review-card">
          <div className="rating"><div className="rating-inner">{review.attributes.Rating}</div></div>
          <h2>{review.attributes.Title}</h2>
          <small>Console List</small>
          <p>{review.attributes.Body}</p>
        </div>
      }
    </div>
  )
}
