import React from 'react'
import Form from './form/Form'
import Gallery from './gallery/Gallery'
import { useAuth } from './AuthContext'

const App = () => {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <div className='app-container'>
      {user ? <Gallery /> : <Form />}
    </div>
  )
}

export default App