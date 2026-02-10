'use client'

import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"
import { mockGames } from "../data/mockgames"
import { useMe } from "@/hooks/useMe"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import {  toast } from 'react-toastify';
import NavSearch from "./navsearch"


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [results, setResults] = useState(mockGames)
  ///for logout function
const{data:user}=useMe()
const queryClient = useQueryClient()
const router = useRouter()

  // Links visible to all users
  const publicLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Games", path: "/products" },
  ]

  // Login/Signup links
  const logSignLinks = [{ id: 3, name: "Log In", path: "/login" }]

  const handleSearch = () => {
    const filtered = mockGames.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    )
    setResults(filtered)
  }

const onLogout = () => {
  localStorage.removeItem("token")

  queryClient.setQueryData(["me"], null)
  queryClient.invalidateQueries({ queryKey: ["me"] })
toast("Logged out")

  router.replace("/")
}


  return (
    <nav className="relative z-50 w-full bg-gray-900 text-amber-50 flex justify-between items-center px-6 md:px-20 h-20">
      {/* Logo */}
      <div>
        <img src="/img/icon.png" alt="Website Icon" className="h-16" />
      </div>


      {/* Desktop Menu + Search */}
      <div className="hidden md:flex items-center gap-6 relative">
         <Search
            onClick={() => setSearchOpen((prev) => !prev)}
            className="w-6 h-6 text-white cursor-pointer"
          />
          <NavSearch
            searchName={searchName}
            setSearchName={setSearchName}
            results={results}
            handleSearch={handleSearch}
            isOpen={searchOpen}
          />
             {/* Search icon */}
        <div className="relative">
         <div className="flex gap-10" >
             {publicLinks.map((link) => (
          <Link key={link.id} href={link.path} className="hover:underline">
            {link.name}
          </Link>
        ))}
        
{user ? (
  <>
    <Link className="bg-whit hover:bg-amber-600 px-3 py-1 rounded transition" href="/dashboard">Dashboard</Link>
    <button className="bg-amber-400 hover:bg-amber-600 px-3 py-1 rounded transition" onClick={onLogout}>Log out</button>
  </>
) : (<>
  <Link className="bg-amber-400 hover:bg-amber-600 px-3 py-1 rounded transition" href="/login">Login</Link>
</>)}
      </div>
  
        </div>

      </div>
      

 
   

         
<div className="mt-4 md:hidden relative">
          <Search
            onClick={() => setSearchOpen((prev) => !prev)}
            className="w-6 h-6 text-white cursor-pointer"
          />
          <NavSearch
            searchName={searchName}
            setSearchName={setSearchName}
            results={results}
            handleSearch={handleSearch}
            isOpen={searchOpen}
          />
        </div>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden z-50"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M2 4.75h16v1.5H2zm0 4.5h16v1.5H2zm0 4.5h16v1.5H2z" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden absolute top-full left-0 w-full bg-gray-900 flex flex-col gap-4 p-6 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {publicLinks.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        {logSignLinks.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            className="bg-amber-400 hover:bg-amber-600 px-3 py-1 rounded transition"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        {/* Mobile Search */}
        
      </ul>
      
    </nav>
  )
}

export default NavBar
