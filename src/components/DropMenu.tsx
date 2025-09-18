import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface DropMenuProps {
  options: { label: string; path: string }[];
}

const DropMenu: React.FC<DropMenuProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-gray-700 bg-gray-100 px-2 py-2 rounded-full'
      >
        <Bars3Icon className="h-6 w-6 text-gray-700 cursor-pointer" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
  <div className='absolute right-0 top-14 mt-4 w-60 bg-white rounded-lg shadow-lg border'>
          <ul className='py-2'>
            {options.map((option, idx) => (
              <a 
              key={idx}>
                <Link
                  to={option.path}
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                  onClick={() => setIsOpen(true)}
                > {option.label}
                </Link>
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropMenu