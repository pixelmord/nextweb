import type { User } from "@supabase/supabase-js"
import { useEffect, useReducer, useState } from "react"

import { supabase } from "@/lib/supabase"

import "./style.css"

function IndexPopup() {
  const [count, increase] = useReducer((c) => c + 1, 0)

  const [user, setUser] = useState<User>(null)
  useEffect(() => {
    async function getUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
    }
    if (!user) {
      getUser()
    }
  }, [user])
  if (!user) {
    return null
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      {user && (
        <div>
          {user.email} - {user.id}
        </div>
      )}
      <button
        onClick={() => increase()}
        type="button"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Count:
        <span className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold text-red-800 bg-blue-200 rounded-full">
          {count}
        </span>
      </button>
    </div>
  )
}

export default IndexPopup
