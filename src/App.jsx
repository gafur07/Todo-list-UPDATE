import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Posts from './components/Posts'

const App = () => {
  const dispatch = useDispatch()
  
  const store = useSelector(state => state.posts)
  console.log(store)
  return (
    <>
      <Posts />
    </>
  )
}

export default App