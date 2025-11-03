import { useState, useEffect, useRef } from 'react';
import AuthModal from './AuthModal';
import PropertyUploadModal from './PropertyUploadModal';
import { useAuth } from '../context/AuthContext';
import { ChevronDown } from 'lucide-react'; // ✅ added icon for dropdown

const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ for dropdown toggle

  const { user, logout } = useAuth();
   const dropdownRef = useRef<HTMLDivElement>(null); // 🆕 ref for outside click detection

  const onOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const onCloseAuth = () => {
    setIsAuthModalOpen(false);
  };

  const onOpenPropertyUpload = () => {
    setIsPropertyModalOpen(true);
  };

  const onClosePropertyUpload = () => {
    setIsPropertyModalOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // ✅ toggle dropdown

   // 🆕 close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-red-500">Nook</div>
          </div>

          <div className="flex items-center space-x-4">
            {/* ✅ Kept Host on Nook button */}
            <button
              className="text-gray-500 hover:text-gray-900 font-medium"
              onClick={onOpenPropertyUpload}
            >
              Host on Nook
            </button>

            {user ? (
              // ✅ Avatar + dropdown menu
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user?.username || "User")
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <ChevronDown
                    size={18}
                    className={`text-gray-600 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // ✅ Placeholder for settings (dark mode toggle can go here later)
                        alert('Settings clicked (add dark mode here later)');
                        setIsDropdownOpen(false);
                      }}
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ✅ unchanged login/signup buttons
              <div className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Log in
                </button>
                <div className="h-5 w-px bg-gray-400"></div>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={onCloseAuth} />
      <PropertyUploadModal
        isOpen={isPropertyModalOpen}
        onClose={onClosePropertyUpload}
      />
    </>
  );
};

export default Navbar;
