'use client'

import { X, Loader2 } from 'lucide-react'
import { useState } from 'react'

const ResetQuery = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => {
    setIsLoading(true) // loading শুরু

    const form = document.getElementById('search-form') as HTMLFormElement
    if (form) form.reset()
    // short delay দিয়ে URL reset
    setTimeout(() => {
      window.location.href = window.location.pathname
    }, 200) // 200ms delay, user feedback দেখানোর জন্য
  }

  return (
    <button
      onClick={handleReset}
      type="reset"
      disabled={isLoading}
      className="flex items-center gap-1 px-2 py-1 rounded bg-amber-700 hover:bg-amber-600 text-gray-200 shadow-sm border border-gray-300 dark:bg-amber-700 dark:border-gray-700 dark:hover:bg-amber-800 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <X size={16} strokeWidth={2} />}
      <span className="text-sm font-medium">{isLoading ? 'Resetting...' : 'Reset'}</span>
    </button>
  )
}

export default ResetQuery;