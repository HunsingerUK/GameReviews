import React, {useState, useEffect} from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom';

const CATEGORY = gql`
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

export default function Category() {
  const { id } = useParams();
  const {loading, error, data} = useQuery(CATEGORY, {
    variables: { id: id }
  });
  const [category, setCategory] = useState(null);
  const [thing, setThing] = useState(null);
  const [expandClicked, setExpandClicked] = useState(false);
  console.log("data", data)
  const d = data?.category?.data;

  useEffect(() => {
    if (d) {
      const projection = {
        Id: d.id,
        Name: d.attributes.Name,
        Reviews: d.attributes.reviews.data.map(r => (
          {
            Id: r.id,
            Title: r.attributes.Title,
            Rating: r.attributes.Rating,
            Description: r.attributes.Body,
            AbbreviatedDesc: r.attributes.Body.substring(0, 200),
            Expand: false,
            Categories: r.attributes.categories.data.map(c => (
              {
                Id: c.id,
                Name: c.attributes.Name
              }
            ))
          }
        ))
      };
      setCategory(projection);
    }
  }, [data]);
  
  const handleDescriptionExpand = (e) => {
    category.Reviews.find((r) => r.Id === e.target.value).Expand = !category.Reviews.find((r) => r.Id === e.target.value).Expand;
    setThing(thing)
    setExpandClicked(prev => !prev)
  }
  return (
    <>
      <div>Category</div>
      {category &&
        <h2 key={category.Id}>{category.Name}</h2>
      }
      {category && 
        category.Reviews.map(review => (
          <div key={review.Id} className="review-card">
            <div className="rating">
              <div className="rating-inner">{review.Rating}</div>
            </div>
            <Link to={`/details/${review.Id}`}>
              <h2>{review.Title}</h2>
            </Link>
            <small>Console List</small>
            {review.Categories.map(c => (
              <small key={c.Id}>{c.Name}</small>
            ))}
            {!review.Expand && 
              <p>{review.AbbreviatedDesc}<button className="review-desc-button" onClick={handleDescriptionExpand} value={review.Id}>...</button></p>
            }
            
            {review.Expand && 
              <p>{review.Description}<button className="review-desc-button" onClick={handleDescriptionExpand} value={review.Id}>^</button></p>
            }          
          </div>
          // <div key={d.Id}>{d.Title}</div>
          // {d.Categories.map(c => (
          //   <small key={c.Id}>{c.Name}</small>
          // ))}

          // {console.log(d)}
          // {d.Categories.map(c => (
          //   <div key={c.Id}>{c.Name}</div>
          // ))}
      ))}
    </>
  )
}
