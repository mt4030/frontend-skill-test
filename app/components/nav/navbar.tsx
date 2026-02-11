'use client'

import Link from "next/link"
import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { useMe } from "@/hooks/useMe"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import NavSearch from "./navsearch"
import { Avatarprofil } from "../avatar"

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchName, setSearchName] = useState("")

  const { data: user } = useMe()
  const queryClient = useQueryClient()
  const router = useRouter()

  const publicLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Games", path: "/products" },
  ]

  const onLogout = () => {
    localStorage.removeItem("token")
    queryClient.setQueryData(["me"], null)
    queryClient.invalidateQueries({ queryKey: ["me"] })
    toast("Logged out")
    router.replace("/")
  }

  return (
    <nav className="relative z-50 w-full bg-gray-950 text-amber-50 h-20 px-6 md:px-20 flex items-center">

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:flex w-full items-center">

        {/* Left */}
        <div className="flex-1">
         
          <img src="/img/icon.png" alt="Website Icon" className="h-14" />
        </div>

        {/* Center */}
        <div className="flex-1 flex justify-center relative">
          <Search
            onClick={() => setIsSearchOpen(prev => !prev)}
            className="w-6 h-6 cursor-pointer"
          />

          <NavSearch
            searchName={searchName}
            setSearchName={setSearchName}
            isOpen={isSearchOpen}
          />
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-end items-center gap-10">
          {publicLinks.map(link => (
            <Link key={link.id} href={link.path} className="hover:text-amber-100">
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsAvatarOpen(prev => !prev)}
                className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-full"
              >
                <Avatarprofil />
                <ChevronDown className="w-4 h-4" />
              </button>

              {isAvatarOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setIsAvatarOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="border border-amber-300 hover:text-gray-900 hover:bg-amber-400 px-3 py-1 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="md:hidden w-full flex justify-between items-center">

        <img src="/img/icon.png" alt="Website Icon" className="h-12" />

        <div className="flex items-center gap-4">
          <Search
            onClick={() => setIsSearchOpen(prev => !prev)}
            className="w-6 h-6 cursor-pointer"
          />

          <button onClick={() => setIsMobileMenuOpen(prev => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M2 4.75h16v1.5H2zm0 4.5h16v1.5H2zm0 4.5h16v1.5H2z" />
            </svg>
          </button>
        </div>

        <NavSearch
          searchName={searchName}
          setSearchName={setSearchName}
          isOpen={isSearchOpen}
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-gray-900 flex flex-col gap-4 p-6">
          {publicLinks.map(link => (
            <Link
              key={link.id}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </ul>
      )}
    </nav>
  )
}

export default NavBar
