'use client'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import clsx from 'clsx'

type DropdownItem = { id?: string | number; name: string }

type DropdownProps<T extends DropdownItem> = {
  data: T[]
  value: T | T[] | null
  onChange: (value: T | T[]) => void
  multiple?: boolean
  label?: string
  placeholder?: string
}

export default function Dropdown<T extends DropdownItem>({
  data,
  value,
  onChange,
  multiple = false,
  label,
  placeholder = 'Select...',
}: DropdownProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSelectAll, setIsSelectAll] = useState(false)

  const displayValue = () => {
    if (multiple) {
      if (!Array.isArray(value) || value.length === 0) return placeholder
      return value.map(v => v.name).join(', ')
    }
    return (value as T | null)?.name ?? placeholder
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectAll = () => {
    if (isSelectAll) {
      onChange([]) // Deselect all
    } else {
      onChange(data) // Select all
    }
    setIsSelectAll(!isSelectAll)
  }

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm text-gray-300">{label}</label>}
      
      <Listbox value={value ?? undefined} onChange={onChange} multiple={multiple}>
        <div className="relative">
          <ListboxButton className="relative w-full rounded-lg bg-gray-800 py-2 pr-8 pl-3 text-left text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
            <span className="block truncate">{displayValue()}</span>
            <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 text-white/60" />
          </ListboxButton>

          <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-900 border border-gray-700 p-1 focus:outline-none">
            
            {/* Search Input */}
            <div className="px-3 py-2">
              <input
                type="text"
                className="w-full bg-gray-800 text-white rounded-md px-3 py-2 text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Select All / Deselect All Button - Only if it's a multiple selection dropdown */}
            {multiple && (
              <div 
                className="px-3 py-2 cursor-pointer text-sm text-gray-400 hover:bg-gray-700"
                onClick={handleSelectAll}
              >
                {isSelectAll ? 'Deselect All' : 'Select All'}
              </div>
            )}

            {/* List of options */}
            {filteredData.map((item) => (
              <ListboxOption
                key={item.id ?? item.name}
                value={item}
                className={({ active, selected }) =>
                  clsx(
                    'group flex cursor-pointer items-center gap-2 mb-1 rounded-md px-3 py-2 text-sm text-white',
                    active && 'bg-gray-700',
                    selected && 'bg-gray-600'
                  )
                }
              >
                <CheckIcon className="invisible h-5 w-5 text-amber-400 group-data-selected:visible" />
                {item.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}
