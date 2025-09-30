import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import PropertyCard from "../components/PropertyCard";



const Landing = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showDetails, setShowDetails] = useState(true);
  const categoryTabsRef = useRef<HTMLDivElement>(null);

  const handleInspirationClick = (category: string) => {
    setActiveCategory(category);
    setTimeout(() => {
      categoryTabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const properties = [
    {
      id: 1,
      title: 'Modern Beach House',
      location: 'Malibu, California',
      distance: '2,500 miles away',
      dates: 'Mar 15 - 20',
      price: 320,
      rating: 4.95,
      isNew: true,
      category: 'beachfront',
      images: [
        "https://images.unsplash.com/photo-1721369483526-62f48a00b949?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1517541866997-ea18e32ea9e9?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 2,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      distance: "1,200 miles away",
      dates: "Apr 1 – 6",
      price: 180,
      rating: 4.89,
      isNew: false,
      category: 'cabins',
      images: [
        "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1634849663266-ade7df369121?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 3,
      title: "Luxury Downtown Loft",
      location: "New York, New York",
      distance: "850 miles away",
      dates: "Feb 28 – Mar 5",
      price: 450,
      rating: 4.92,
      isNew: false,
      category: 'luxury',
      images: [
        "https://images.unsplash.com/photo-1753505889211-9cfbac527474?q=80&w=1708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1721523234197-29e080a404bb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1751806524609-ce4550a4aae6?q=80&w=1686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 4,
      title: "Treehouse Retreat",
      location: "Portland, Oregon",
      distance: "900 miles away",
      dates: "May 10 – 15",
      price: 220,
      rating: 4.97,
      isNew: true,
      category: 'unique',
      images: [
        "https://images.unsplash.com/photo-1550355191-aa8a80b41353?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1684058279462-6dc1290f0fd9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 5,
      title: "Countryside Villa",
      location: "Tuscany, Italy",
      distance: "6,200 miles away",
      dates: "Jun 20 – 27",
      price: 280,
      rating: 4.88,
      isNew: false,
      category: 'countryside',
      images: [
        "https://plus.unsplash.com/premium_photo-1680300960892-bd11b59b469b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1590266830010-7bf5c3339536?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 6,
      title: "Ocean View Penthouse",
      location: "Miami, Florida",
      distance: "1,800 miles away",
      dates: "Jan 15 – 22",
      price: 380,
      rating: 4.94,
      isNew: false,
      category: 'cityscape',
      images: [
        "https://images.unsplash.com/photo-1600671012016-e5890d87f804?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/621385018/photo/3d-rendering-luxury-villa-bedroom-near-beach.webp?a=1&s=612x612&w=0&k=20&c=wZEj9ROQgC6JXp78PiTYHOpkNLSOyshc0g0GdV2KTSQ="
      ]
    },
    {
      id: 7,
      title: "Desert Oasis",
      location: "Scottsdale, Arizona",
      distance: "1,100 miles away",
      dates: "Mar 8 – 13",
      price: 195,
      rating: 4.91,
      isNew: true,
      category: 'trending',
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/93/72/79/desert-pool-villas.jpg?w=900&h=500&s=1",
        "https://www.redseaglobal.com/documents/d/guest/desert_rock_005-1-jpg"
      ]
    },
    {
      id: 8,
      title: "Lakefront Lodge",
      location: "Lake Tahoe, California",
      distance: "1,500 miles away",
      dates: "Jul 4 – 11",
      price: 340,
      rating: 4.86,
      isNew: false,
      category: 'beachfront',
      images: [
        "https://images.unsplash.com/photo-1752981492133-4ae3442d86ea?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1693498871401-9d269ecdcfc1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    }
  ];

  const filteredProperties = activeCategory === 'all'
    ? properties
    : properties.filter(property => property.category === activeCategory);


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 py-8 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Find your next nook</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Search low prices on hotels, homes and much more...
          </p>
          <SearchBar />
        </div>
      </section>


      <div ref={categoryTabsRef}>
        <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Inspiration for future getaways</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2">
            <div
              className="relative h-96 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => handleInspirationClick('trending')}
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                alt="Featured destination"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duaration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">The great outdoors</h3>
                  <p>Wishlists curated by Nook</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-rows-2 gap-4">
            {[
              { title: "Unique stays", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400", category: "unique" },
              { title: "Entire homes", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400", category: "all" },
              // { title: "Pet-friendly", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400", category: "pet-friendly" },
              { title: "Travel tips", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400", category: "trending" }
            ].map((item, index) => (
              <div
                key={index}
                className="relative h-44 rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => handleInspirationClick(item.category)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
