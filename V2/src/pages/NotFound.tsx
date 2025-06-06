import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle clicking home link
  const handleHomeClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-amber-50 font-inter">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 bg-amber-50 z-50 transition-transform duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-12 lg:px-32 py-4">
          <nav className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <Link to="/" onClick={handleHomeClick} className="font-playfair text-xl md:text-2xl font-bold text-black tracking-wide hover:opacity-80 transition-opacity">
              ADITYA VENKAT
            </Link>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link to="/#about" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>About</Link>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Blogs</a>
              <Link to="/pictures" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Pictures</Link>
              <Link to="/fan-of" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Fan Of</Link>
              <Link to="/#connect" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Connect</Link>
            </div>
          </nav>
        </div>
        {/* Painted line separator */}
        <div className="mx-12 lg:mx-32">
          <div className="h-1 relative overflow-hidden">
            <div className="absolute inset-0 opacity-90"
                 style={{
                   background: `linear-gradient(90deg, transparent 5%, #8B4513 15%, #A0522D 25%, #8B4513 35%, #A0522D 45%, #8B4513 55%, #A0522D 65%, #8B4513 75%, #A0522D 85%, #8B4513 95%, transparent 100%)`,
                   filter: 'blur(0.5px)',
                   transform: 'scaleY(0.6) rotate(0.3deg)',
                   borderRadius: '2px'
                 }}>
            </div>
            <div className="absolute inset-0 opacity-60"
                 style={{
                   background: `linear-gradient(90deg, transparent 10%, #654321 20%, #8B4513 30%, #654321 40%, #8B4513 50%, #654321 60%, #8B4513 70%, #654321 80%, #8B4513 90%, transparent 100%)`,
                   filter: 'blur(0.3px)',
                   transform: 'scaleY(0.8) rotate(-0.2deg)',
                   borderRadius: '1px'
                 }}>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-black mb-8 leading-tight">
              404
            </h1>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6" style={{ color: '#8B4513' }}>
              Lost in the Digital Wilderness
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Seems like you've wandered into uncharted territory. Even the best explorers sometimes take a wrong turn. 
              Let's get you back to familiar ground.
            </p>
            
            <div className="flex justify-center">
              <Link 
                to="/" 
                onClick={handleHomeClick}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Painted line separator */}
      <div className="mx-12 lg:mx-32">
        <div className="h-0.5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-80"
               style={{
                 background: `linear-gradient(90deg, transparent 8%, #8B4513 18%, #A0522D 28%, #8B4513 38%, #A0522D 48%, #8B4513 58%, #A0522D 68%, #8B4513 78%, #A0522D 88%, transparent 100%)`,
                 filter: 'blur(0.4px)',
                 transform: 'scaleY(0.7) rotate(0.2deg)',
                 borderRadius: '1px'
               }}>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-3">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" onClick={handleHomeClick} className="font-playfair text-xl font-bold text-white hover:text-gray-300 transition-colors">
              ADITYA VENKAT
            </Link>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link to="/#about" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">About</Link>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Blogs</a>
              <Link to="/pictures" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Pictures</Link>
              <Link to="/fan-of" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Fan Of</Link>
              <Link to="/#connect" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Connect</Link>
            </div>
            <div className="text-sm text-gray-300">
              © 2025 Aditya Venkat
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
