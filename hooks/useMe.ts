import { useQuery } from "@tanstack/react-query"

// Function to fetch the current logged-in user
const fetchMe = async () => {
  // Get token from localStorage
  const token = localStorage.getItem("token")

  // If there is no token, user is not authenticated
  if (!token) return null

  // Send request to get user info with Bearer token
  const res = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  // If request failed (invalid token or error), return null
  if (!res.ok) return null

  // Return user data as JSON
  return res.json()
}

// Custom hook to use user data inside components
export function useMe() {
  return useQuery({
    // Unique key for caching user data
    queryKey: ["me"],

    // Function that fetches user data
    queryFn: fetchMe,
  })
}
