'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
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
  const displayValue = () => {
    if (multiple) {
      if (!Array.isArray(value) || value.length === 0) return placeholder
      return value.map(v => v.name).join(', ')
    }
    return (value as T | null)?.name ?? placeholder
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
            {data.map((item) => (
              <ListboxOption
                key={item.id ?? item.name}
                value={item}
                className="group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-white data-focus:bg-gray-700"
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
