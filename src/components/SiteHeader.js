import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
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

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES);
  const [categories, setCategories] = useState(null);
  console.log(data)

  useEffect(() => {
    let graphQlData = [];
    if (!loading) {
      graphQlData = data?.categories?.data.map(d => {
        return {
          Id: d.id,
          Name: d.attributes.Name
        }
      })
      setCategories(graphQlData);
    }
  }, [data]);

  if (loading) return <p>Loading Categories...</p>;

  if (error) return <p>Error fetching Categories</p>

  console.log(categories)

  return (
    <div className='site-header'>
        <Link to="/"><h1>Game Reviews</h1></Link>
        <nav className="categories">
          <span>Filter Reviews by Category:</span>
          {categories && categories.map(d => (
            <Link key={d.Id} to={`/category/${d.Id}`}>
              {d.Name}
            </Link>
          ))}
        </nav> 
    </div>
  )
}
