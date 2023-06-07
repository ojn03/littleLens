import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from './MasonryLayout.jsx'
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)

  //useParams is used to return url parameters for Route
  //this corespons to :categoryId route in Pin.jsx
  const { categoryId } = useParams();


  //useEffect takes in (callback function, dependencies)
  //the callback is only executed whenever dependencies change
  useEffect(() => {
    setLoading(true)
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [categoryId])


  if (loading) return <Spinner message="We are adding new ideas to your feed!" />
  
  if(!pins?.length) return <h2>no pins of this category available</h2>
  
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
}

export default Feed