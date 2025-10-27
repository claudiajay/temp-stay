import { useState } from 'react';
import AuthModal from './AuthModal';
import PropertyUploadModal from './PropertyUploadModal';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [, setAuthMode] = useState<'login' | 'signup'>('login');
   const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);

   const { user, logout } = useAuth();

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

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-red-500">Nook</div>
            {/* <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Stays</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Experiences</a>
            </div> */}
          </div>
          <div className="flex items-center space-x-4">
            <button 
            className="text-gray-500 hover:text-gray-900 font-medium"
            onClick={onOpenPropertyUpload}
            >Host on Nook</button>

             {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user.username || 'User'} 
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
                </div>
            ) : (

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
              {/* <div className="w-8 h-8 bg-gray-800 rounded-full ml-2"></div> */}
            </div>
             )}
          </div>
        </div>
         
      </nav>

    
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={onCloseAuth}
        // mode={authMode}
      />

      <PropertyUploadModal
        isOpen={isPropertyModalOpen}
        onClose={onClosePropertyUpload}
      />
    </>
  );
};

export default Navbar;
