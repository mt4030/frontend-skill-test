'use client'
import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useMe } from "@/hooks/useMe"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import NavSearch from "./navsearch"
import { Avatarprofil } from "../avatar"
import SiteIcon from "../siteicon"
import { Button } from "@/components/ui/button"
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)
  //for checkng auth for ui
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
     <SiteIcon/>

    
        <NavSearch/>

       

        {/* Right */}
        <div className="flex-1 flex justify-end items-center gap-10">
          {publicLinks.map(link => (
            <Link key={link.id} href={link.path} className="hover:text-amber-100">
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <Button
                onClick={() => setIsAvatarOpen(prev => !prev)}
                className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-full"
              >
                <Avatarprofil />
                <ChevronDown className="w-4 h-4" />
              </Button>

              {isAvatarOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setIsAvatarOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </Button>
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

          <Button onClick={() => setIsMobileMenuOpen(prev => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M2 4.75h16v1.5H2zm0 4.5h16v1.5H2zm0 4.5h16v1.5H2z" />
            </svg>
          </Button>
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
              <Button onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
             <NavSearch/>
        </ul>
      )}
    </nav>
  )
}

export default NavBar
