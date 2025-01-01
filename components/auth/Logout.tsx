'use client'

import { MouseEventHandler, useCallback } from 'react'

export function Logout() {
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault()

      const res = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!res.ok) {
        console.error('Sorry! something went wrong.')
        return
      }

      location.href = '/'
    },
    []
  )

  return (
    <div>
      <button
        className="text-sm font-medium hover:text-sky-500"
        onClick={onClick}
      >
        Logout
      </button>
    </div>
  )
}
