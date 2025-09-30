import { useState } from 'react';
import {ChevronLeft, ChevronRight, Heart, Star, Wifi, Car, Tv, Coffee, Bath, Home, Users,Bed,MapPin,Shield,Award,CreditCard,Lock,Check,ArrowLeft} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface PropertyDetailsPageProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    rating: number;
    category: string;
    isNew: boolean;
    images: string[];
  };
  onBack: () => void;
}

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ property, onBack }) => {
  const navigate = useNavigate();

  const propertyData = {
    ...property,
    reviewCount: 127,
    host: {
      name: "Sarah",
      avatar: "https://img.freepik.com/premium-vector/portrait-business-woman_505024-2793.jpg?semt=ais_incoming&w=740&q=80",
      superhost: true,
      joinDate: "Joined in 2018",
      responseRate: "100%",
      responseTime: "Within an hour"
    },
    details: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 3
    },
    amenities: [
      { icon: Wifi, name: "Wifi" },
      { icon: Car, name: "Free parking" },
      { icon: Tv, name: "TV" },
      { icon: Coffee, name: "Kitchen" },
      { icon: Bath, name: "Bathtub" },
      { icon: Home, name: "Dedicated workspace" }
    ],
    description: `Escape to this stunning ${property?.category || 'luxury'} retreat in ${property?.location || 'beautiful location'}. This ${property?.title?.toLowerCase() || 'amazing property'} offers breathtaking views and luxurious amenities. Perfect for families or groups looking for an unforgettable experience.`,
    highlights: [
      "Prime location with easy access",
      "Stunning views from every room",
      "Modern amenities and appliances",
      "Outdoor space for relaxation",
      "Walking distance to local attractions"
    ]
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [showBooking, setShowBooking] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('details'); // details, payment, confirmation

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'United States'
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length);
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn).getTime();
      const end = new Date(checkOut).getTime();
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * propertyData.price;
    const cleaningFee = 75;
    const serviceFee = Math.round(subtotal * 0.14);
    const taxes = Math.round(subtotal * 0.12);
    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      taxes,
      total: subtotal + cleaningFee + serviceFee + taxes
    };
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    setShowPayment(true);
  };

  // const processPayment = () => {
  //   // Mock payment processing
  //   setPaymentStep('confirmation');
  //   setTimeout(() => {
  //     alert('Booking confirmed! You will receive a confirmation email shortly.');
  //     setShowPayment(false);
  //     setPaymentStep('details');
  //   }, 2000);
  // };

  interface BackButtonProps {
    onClick: () => void;
    text: string;
  }
  const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
    >
      <ArrowLeft size={20} />
      <span>{text}</span>
    </button>
  );

  const handleBack = () => {
    navigate('/'); //to landing page
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <BackButton onClick={handleBack} text="Back to property" />

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">Complete your booking</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Left Column - Form */}
              <div className="space-y-6">
                {paymentStep === 'details' && (
                  <>
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Your trip details</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Dates:</span>
                          <span className="font-medium">{checkIn} - {checkOut}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span className="font-medium">{guests} guest{guests > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-4">Contact information</h2>
                      <div className="space-y-4">
                        <input
                          type="email"
                          placeholder="Email address"
                          value={paymentForm.email}
                          onChange={(e) => handlePaymentInputChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First name"
                            value={paymentForm.firstName}
                            onChange={(e) => handlePaymentInputChange('firstName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Last name"
                            value={paymentForm.lastName}
                            onChange={(e) => handlePaymentInputChange('lastName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-4">Payment method</h2>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg">
                          <CreditCard size={20} />
                          <span>Credit or debit card</span>
                        </div>

                        <input
                          type="text"
                          placeholder="Card number"
                          value={paymentForm.cardNumber}
                          onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentForm.expiryDate}
                            onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={paymentForm.cvv}
                            onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Name on card"
                          value={paymentForm.nameOnCard}
                          onChange={(e) => handlePaymentInputChange('nameOnCard', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-4">Billing address</h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Address"
                          value={paymentForm.billingAddress}
                          onChange={(e) => handlePaymentInputChange('billingAddress', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={paymentForm.city}
                            onChange={(e) => handlePaymentInputChange('city', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="ZIP code"
                            value={paymentForm.zipCode}
                            onChange={(e) => handlePaymentInputChange('zipCode', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setPaymentStep('payment')}
                      className="w-full bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center space-x-2"
                    >
                      <Lock size={20} />
                      <span>Confirm and pay</span>
                    </button>
                  </>
                )}

                {paymentStep === 'payment' && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold mb-2">Processing payment...</h2>
                    <p className="text-gray-600">Please don't refresh the page</p>
                  </div>
                )}

                {paymentStep === 'confirmation' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Booking confirmed!</h2>
                    <p className="text-gray-600">You'll receive a confirmation email shortly</p>
                  </div>
                )}
              </div>

              {/* Right Column - Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={propertyData.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=80&fit=crop'}
                    alt={propertyData.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{propertyData.title}</h3>
                    <p className="text-sm text-gray-600">{propertyData.location}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star size={12} className="fill-current text-yellow-500" />
                      <span className="text-sm font-medium">{propertyData.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold">Price breakdown</h3>
                  {(() => {
                    const costs = calculateTotal();
                    return (
                      <>
                        <div className="flex justify-between">
                          <span>${propertyData.price} × {costs.nights} nights</span>
                          <span>${costs.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cleaning fee</span>
                          <span>${costs.cleaningFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee</span>
                          <span>${costs.serviceFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes</span>
                          <span>${costs.taxes}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${costs.total}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield size={16} />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <BackButton onClick={onBack} text="Back" />
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-96 md:h-[500px]">
          <div className="md:col-span-2 relative">
            <img
              src={propertyData.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'}
              alt={propertyData.title}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setCurrentImageIndex(0)}
            />
            {propertyData.images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2">
            {propertyData.images?.slice(1, 3).map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`View ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                onClick={() => setCurrentImageIndex(index + 1)}
              />
            )) || (
                <>
                  <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" alt="View 2" className="w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop" alt="View 3" className="w-full h-full object-cover" />
                </>
              )}
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2">
            {propertyData.images?.slice(3, 5).map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`View ${index + 4}`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                onClick={() => setCurrentImageIndex(index + 3)}
              />
            )) || (
                <>
                  <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" alt="View 4" className="w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" alt="View 5" className="w-full h-full object-cover" />
                </>
              )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold">{propertyData.title}</h1>
                {propertyData.isNew && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">New</span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="fill-current text-yellow-500" />
                  <span className="font-medium">{propertyData.rating}</span>
                  <span>({propertyData.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{propertyData.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>{propertyData.details.guests} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Home size={16} />
                  <span>{propertyData.details.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed size={16} />
                  <span>{propertyData.details.beds} beds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath size={16} />
                  <span>{propertyData.details.bathrooms} baths</span>
                </div>
              </div>
            </div>

            <hr />

            {/* Host Info */}
            <div className="flex items-center space-x-4">
              <img
                src={propertyData.host.avatar}
                alt={propertyData.host.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Hosted by {propertyData.host.name}</span>
                  {propertyData.host.superhost && (
                    <Award size={16} className="text-red-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{propertyData.host.joinDate}</p>
              </div>
            </div>

            <hr />

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <ul className="space-y-2">
                {propertyData.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check size={16} className="text-green-600" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {propertyData.amenities.map((amenity: { icon: any; name: string }, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon size={20} />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-gray-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold">${propertyData.price}</span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={16} className="fill-current text-yellow-500" />
                  <span className="font-medium">{propertyData.rating}</span>
                  <span className="text-gray-600">({propertyData.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden">
                  <div className="p-3 border-r border-gray-300">
                    <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm focus:outline-none"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">CHECKOUT</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm focus:outline-none"
                  >
                    {[...Array(propertyData.details.guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Reserve
              </button>

              <p className="text-center text-gray-600 text-sm mt-3">
                You won't be charged yet
              </p>

              {checkIn && checkOut && (
                <div className="space-y-3 mt-6">
                  {(() => {
                    const costs = calculateTotal();
                    return (
                      <>
                        <div className="flex justify-between">
                          <span>${propertyData.price} × {costs.nights} nights</span>
                          <span>${costs.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cleaning fee</span>
                          <span>${costs.cleaningFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee</span>
                          <span>${costs.serviceFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes</span>
                          <span>${costs.taxes}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${costs.total}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component to show the PropertyDetailsPage in action
const PropertyDetails = () => {
  // const [showDetails, setShowDetails] = useState(true);

  // Sample property data for demo
  const sampleProperty = {
    id: 1,
    title: "Luxurious Mountain Retreat",
    location: "Prampram, Greater Accra",
    price: 450,
    rating: 4.95,
    category: "luxury villa",
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ]
  };

   const navigate = useNavigate();
   useParams();
  
  const handleBack = () => {
    navigate('/'); // Navigate to landing page
  };

  return (
    <div>
      <PropertyDetailsPage
        property={sampleProperty}
        onBack={handleBack}
      />
    </div>
  );
};

export default PropertyDetails;