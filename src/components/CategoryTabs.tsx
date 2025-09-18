import React from 'react';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'trending', name: 'Trending' },
    { id: 'beachfront', name: 'Beachfront' },
    { id: 'cabins', name: 'Cabins'},
    { id: 'luxury', name: 'Luxury'},
    { id: 'unique', name: 'Unique stays'},
    { id: 'countryside', name: 'Countryside'},
    { id: 'cityscape', name: 'Amazing views'}
  ];

  return (
    <div className='flex items-center space-x-8 px-6 py-4 border-r border-gray-200 overflow-x-auto'>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`flex flex-col items-center space-y-2 pb-3 border-b-2 transition whitespace-nowrap
            ${activeCategory === category.id
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          <span className='text-xs font-medium'>{category.name}</span>
          {/* <span></span> */}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;