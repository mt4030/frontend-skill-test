'use client'
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { mockGames } from "../data/mockgames"
const NavSearch = ({
  searchName,
  setSearchName,
  results,
  handleSearch,
  isOpen,
}: {
  searchName: string
  setSearchName: (val: string) => void
  results: typeof mockGames
  handleSearch: () => void
  isOpen: boolean
}) => {
  if (!isOpen) return null

  return (
    <Field className="absolute top-full left-0 w-full mt-2 md:mt-0 md:w-80 bg-gray-900 p-4 rounded shadow-lg z-50">
      <ButtonGroup className="w-full">
        <Input
          placeholder="Type to search..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" onClick={handleSearch}>
          Search
        </Button>
      </ButtonGroup>
      <ul className="mt-2 max-h-60 overflow-y-auto">
        {results.map((item) => (
          <li key={item.id} className="py-1 hover:text-amber-400 cursor-pointer">
            {item.name}
          </li>
        ))}
      </ul>
    </Field>
  )
}

export default NavSearch