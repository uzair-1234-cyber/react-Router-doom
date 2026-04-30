import React, { useState } from 'react'
import { signUp } from '../firebase.js'
import { useNavigate, Link } from 'react-router-dom'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signUp(email, password, 'user')
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-50 to-white px-4">
      <form onSubmit={handleSubmit} className="max-w-md h-[400px] items-center flex justify-center  flex-col p-2  w-[400px] bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create your account</h2>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <label className="block mb-2 text-sm text-gray-600">Email</label>
        <input
          className="w-[300px] mb-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <label className="block mb-2 text-sm text-gray-600">Password</label>
        <input
          className="w-[300px] mb-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />

        <button
          type="submit"
          className="w-[300px] bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Sign up'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="text-indigo-600 font-medium">Sign in</Link>
        </div>
      </form>
    </div>
  )
}