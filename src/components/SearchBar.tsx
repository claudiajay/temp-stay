import React from 'react'

const SearchBar = () => {
  return (
    <div className='bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center max-w-4xl mx-auto mb-8'>
      <div className='flex-1 px-6 py-3 border-r border-grey-200'>
        <div className='text-xs font-semibold text-gray-900 mb-1'>Where</div>
        <input placeholder='Search destinations' className='w-full outline-none text-sm text-gray-500' />
      </div>
      <div className='flex-1 px-6 py-3 border-r border-grey-200'>
        <div className='text-xs font-semibold text-gray-900 mb-1'>Check in</div>
        <input placeholder='Search destinations' className='w-full outline-none text-sm text-gray-500' />
      </div>
      <div className='flex-1 px-6 py-3 border-r border-grey-200'>
        <div className='text-xs font-semibold text-gray-900 mb-1'>Check out</div>
        <input placeholder='Search destinations' className='w-full outline-none text-sm text-gray-500' />
      </div>
      <div className='flex-1 px-6 py-3 border-r border-grey-200'>
        <div className='text-xs font-semibold text-gray-900 mb-1'>Who</div>
        <input placeholder='Search destinations' className='w-full outline-none text-sm text-gray-500' />
      </div>
      <div className='flex px-3 py-3 border-grey-200'>
        <button className='bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
      </div>
      
    </div>
  )
}

export default SearchBar