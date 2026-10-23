import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const Form = () => {
  const [mode, setMode] = useState('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const isSignup = mode === 'signup'

  const switchMode = (next) => {
    setMode(next)
    setError('')
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, phone } },
      })

      if (error) setError(error.message)
      else if (!data.session) {
        // email confirmation is on: no session until they click the link
        setMessage('Check your email to confirm your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <p className='form-eyebrow'>welcome to</p>
        <h1>The Common Ground</h1>
        <hr />

        <div className='sign-log-cta'>
          <button
            type='button'
            className={`tab ${isSignup ? 'active' : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign Up
          </button>
          <button
            type='button'
            className={`tab ${!isSignup ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Log In
          </button>
        </div>

        <div className='fields'>
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='you@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='At least 6 characters'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {isSignup && (
            <>
              <div className='field'>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='field'>
                <label htmlFor='phone'>Phone number</label>
                <input
                  id='phone'
                  type='tel'
                  placeholder='082 000 0000'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {error && <p className='form-error'>{error}</p>}
        {message && <p className='form-message'>{message}</p>}

        <button type='submit' className='submit' disabled={loading}>
          {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
    </div>
  )
}

export default Form