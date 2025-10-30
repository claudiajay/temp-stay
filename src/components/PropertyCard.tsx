import React, {useState} from 'react'
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    distance: string;
    dates: string;
    price: number;
    rating: number;
    isNew: boolean;
    category: string;
    images: string[];
  };
}
const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  }

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  }

  return (
    <div className='group cursor-pointer' onClick={handleCardClick}>
      <div className='relative rounded-xl overflow-hidden mb-3'>
        <div className='relative h-64 bg-gray-200'>
          <img 
            src={property.images[currentImageIndex]}
            alt={property.title}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className='absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition'
          >
            <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}/>
          </button>
          {property.images.length > 1 && (
            <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage(e);
              }}
              className='absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition opacity-0 group=hover:opacity-100'
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage(e);
              }}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition opacity-0 group-hover:opacity-100'
            >
              <ChevronRight size={16} />
            </button>
            <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1'>
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition 
                    ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} 
                />
              ))}
            </div>
            </>
          )}
          {property.isNew && (
            <div className='absolute top-3 left-3 bg-white px-3 py-1 rounded text-xs font-medium'>
              New
            </div>
          )}
        </div>
      </div>
      <div className='space-y-1'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-gray-900 truncate'>{property.title}</h3>
          <div className='flex items-center space-x-1 text-sm'>
            <Star size={12} className='fill-current'/>
            <span className='font-medium'>{property.rating}</span>
          </div>
        </div>
        {/* <p className='text-gray-500 text-sm truncate'>{property.location}</p>
        <p className='text-gray-500 text-sm'>{property.distance}</p>
        <p className='text-gray-500 text-sm'>{property.dates}</p>
        <p className='text-gray-500 font-medium'>
          <span className='font-semibold'>${property.price}</span> night
        </p> */}

        <div className='flex justify-between items-center'>
          <p className='text-gray-500 text-sm truncate'>{property.location}</p>
          <div className='border border-pink-300 rounded-full px-3 py-0.4 hover:shadow-md transition'>
            <p className='text-gray-500 font-medium'>
              <span className='font-semibold'>${property.price}</span> night
            </p>
          </div>
        </div>
        <p className='text-gray-500 text-sm'>{property.distance}</p>
        <p className='text-gray-500 text-sm'>{property.dates}</p>




      </div>
    </div>
  );
};

export default PropertyCard;