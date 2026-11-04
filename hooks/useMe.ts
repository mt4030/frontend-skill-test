import { useQuery } from "@tanstack/react-query"

// function to fetch the current logged-in user
const fetchMe = async () => {
  // get token from localStorage
  const token = localStorage.getItem("token")
 
  if (!token) return null

  /// Send request to get user info with Bearer token
  const res = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) return null
  return res.json()
}

/// Custom hook to use user 
export function useMe() {
  return useQuery({
       queryKey: ["me"],
       queryFn: fetchMe,
  })
}
