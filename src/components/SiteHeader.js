import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteHeader() {
  return (
    <div className='site-header'>
        <Link to="/"><h1>Ninja Reviews</h1></Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/Categories">Categories</Link>
    </div>
  )
}
