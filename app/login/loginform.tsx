'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
  import {  toast } from 'react-toastify';
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg bg-gray-700"
           
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-700"
           
          />
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-amber-500 text-black py-3 rounded-lg"
          >
            {loginMutation.isPending ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center">username: <span className=" text-green-700">emilys </span> password: <span className=" text-green-700"> emilyspass </span>  <br />
        or find more user and password from <span className="text-red-800">https://dummyjson.com/docs</span> 
        </p>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  )
}

export default LoginForm
