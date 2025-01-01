'use client'

import { FormEventHandler, useCallback, useState } from 'react'

export default function Login() {
  const [error, setError] = useState('')

  const onFormSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const res = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        setError('Sorry! something went wrong.')
        return
      }

      const json = (await res.json()) as { success: boolean }
      if (!json.success) {
        setError('Invalid credentials.')
        return
      }

      location.href = '/dashboard'
    },
    []
  )

  return (
    <form className="pt-10" onSubmit={onFormSubmit}>
      <div className="w-96 mx-auto border border-gray-300 rounded-md space-y-3 px-6 py-8">
        <div className="space-y-5">
          <div className="pb-3">
            <h2 className="text-xl font-bold text-center">Login</h2>
          </div>
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm font-bold select-none">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              tabIndex={1}
              placeholder="Username"
              className="block w-full text-sm p-3 bg-white border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 rounded"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-bold select-none">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              tabIndex={2}
              placeholder="Password"
              className="block w-full text-sm p-3 bg-white border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 rounded"
            />
          </div>

          <label className="inline-flex items-center space-x-1.5">
            <input type="checkbox" name="remember" tabIndex={3} />
            <span className="text-gray-500 text-xs leading-5 font-bold cursor-pointer select-none">
              Remember me
            </span>
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              tabIndex={4}
              className="bg-white h-10 border border-gray-400 text-gray-500 hover:border-gray-400 hover:text-black rounded text-sm font-medium px-3"
            >
              Log In
            </button>
          </div>

          {error && (
            <div className="font-medium text-xs text-red-500">{error}</div>
          )}
        </div>
      </div>
    </form>
  )
}
