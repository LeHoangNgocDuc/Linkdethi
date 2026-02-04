import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, UserCog, LogOut } from 'lucide-react';
import { NAV_ITEMS, CENTER_NAME, GOOGLE_SCRIPT_EXAM_URL } from '../constants';
import AdminLogin from './AdminLogin';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavClick = (path?: string) => {
    setIsMobileMenuOpen(false);
    if (!path) return;
    
    if (path === '/thi-truc-tuyen') {
      window.open(GOOGLE_SCRIPT_EXAM_URL, '_blank');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.reload(); // Refresh to update UI components relying on localStorage
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-700 font-bold" : "text-gray-600 hover:text-blue-600";
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-700 p-2 rounded-lg text-white group-hover:bg-blue-800 transition-colors">
                <GraduationCap size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-900 leading-none">{CENTER_NAME}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Học tập & Đổi mới</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${isActive(item.path)}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden xl:flex items-center gap-3">
               {isAdmin ? (
                 <button
                   onClick={handleLogout}
                   className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium text-sm px-3 py-2 border border-transparent hover:border-red-100 rounded-lg transition-all"
                 >
                   <LogOut size={16} />
                   Đăng xuất GV
                 </button>
               ) : (
                 <button
                   onClick={() => setIsLoginModalOpen(true)}
                   className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-medium text-sm px-3 py-2 transition-colors"
                 >
                   <UserCog size={18} />
                   Đăng nhập GV
                 </button>
               )}

               <button
                 onClick={() => window.open(GOOGLE_SCRIPT_EXAM_URL, '_blank')}
                 className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold shadow-sm transition-all transform hover:scale-105"
               >
                 <BookOpen size={18} />
                 <span>Thi Trực Tuyến</span>
               </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive(item.path)} hover:bg-blue-50`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-gray-200 my-2"></div>
            
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-3 rounded-lg font-bold"
              >
                <LogOut size={20} />
                Đăng xuất GV
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-3 rounded-lg font-bold border border-blue-200"
              >
                <UserCog size={20} />
                Đăng nhập GV
              </button>
            )}

            <button
              onClick={() => window.open(GOOGLE_SCRIPT_EXAM_URL, '_blank')}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg font-bold"
            >
              <BookOpen size={20} />
              THI TRỰC TUYẾN
            </button>
          </div>
        )}
      </header>

      <AdminLogin 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={() => setIsAdmin(true)}
      />
    </>
  );
};

export default Header;