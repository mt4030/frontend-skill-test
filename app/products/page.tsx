'use client'

import { useEffect, useState } from "react"
import GameCard from "../components/gameSection/gamesCard"
import { mockGames } from "../data/mockgames"
import { Pagination, PaginationItem } from "@/components/ui/pagination"
import GameMultiSelect from "../components/gameSection/advanceSearch"

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const totalPages = Math.ceil(mockGames.length / itemsPerPage)

  // Slice products for the current page
  const currentProducts = mockGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const goPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <section className="p-10 bg-gray-900 min-h-screen">
       
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {currentProducts.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="flex justify-center  items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-700 cursor-pointer text-white rounded hover:bg-gray-600"
          onClick={goPrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <button
          className="px-3 py-1 bg-gray-700 cursor-pointer text-white rounded hover:bg-gray-600"
          onClick={goNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default Products
