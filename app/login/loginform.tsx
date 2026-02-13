'use client'

/**
 * LoginForm
 *
 * Provides a login form UI with username and password fields.
 * Handles authentication using a POST request to the dummyjson API.
 *
 * Behavior:
 * - Manages local state for username, password, and error messages
 * - Uses react-query's useMutation to handle login request
 * - Stores token in localStorage on successful login
 * - Invalidates 'me' query to refresh authenticated user data
 * - Displays toast notification on success
 * - Redirects user to home page on successful login
 * - Shows error message if login fails
 *
 * Dependencies:
 * - useRouter from Next.js for navigation
 * - useQueryClient from react-query for cache invalidation
 * - toast from react-toastify for notifications
 * - Input and Button UI components from local components
 *
 * Notes:
 * - Login button is disabled while login request is pending
 * - Demo credentials are displayed below the form for testing
 */



import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
  import {  toast } from 'react-toastify';
  import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Login failed")
      }

      return res.json()
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken)
      queryClient.invalidateQueries({ queryKey: ["me"] })
      toast.info("Welcome back")
      router.push("/")
    },
    onError: (err: any) => {
      setError(err.message)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    loginMutation.mutate()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg  bg-gray-700"
           
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg  bg-gray-700"
           
          />
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-amber-500 text-black hover:bg-yellow-400 py-3 rounded-lg"
          >
            {loginMutation.isPending ? "Logging in..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center mt-5">username: <span className=" text-green-700">emilys </span> password: <span className=" text-green-700"> emilyspass </span>  <br />
        or find more user and password from <span className="text-red-800">https://dummyjson.com/docs</span> 
        </p>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  )
}

export default LoginForm
