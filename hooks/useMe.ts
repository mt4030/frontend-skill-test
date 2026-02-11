
import { useQuery } from "@tanstack/react-query"

const fetchMe=async()=>{
const token = localStorage.getItem("token")
  if (!token) return null
  //if we had token we req of fetch
 const res = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
if (!res.ok) return null
  return res.json()
}
//a hook to use elswhere for ui
export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  })
}