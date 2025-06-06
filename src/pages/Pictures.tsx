import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

interface PictureData {
  id: number;
  src: string;
  title: string;
  description: string;
  location: string;
}

const mockPictures: PictureData[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=800",
    title: "Mountain Perspectives",
    description: "Finding clarity in high places, where complex problems become simple patterns. The view from above offers a unique perspective on data visualization and problem-solving approaches.",
    location: "Swiss Alps"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1200&h=800",
    title: "Data Streams",
    description: "Following the flow of information like rivers carving through landscapes. This natural formation reminds me of how data flows through systems, creating patterns and insights.",
    location: "Norwegian Fjords"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&h=800",
    title: "Aerial Views",
    description: "Gaining the high-level perspective needed for strategic insights. Sometimes stepping back and viewing the bigger picture reveals patterns invisible from ground level.",
    location: "Cappadocia, Turkey"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&h=800",
    title: "Ocean Depths",
    description: "Like diving deep into datasets, the ocean holds mysteries that require patience and skill to uncover. Each layer reveals new insights and understanding.",
    location: "Maldives"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=800",
    title: "Forest Analytics",
    description: "Nature's own data visualization - trees representing individual data points that together create a complex ecosystem of information and interdependencies.",
    location: "Canadian Rockies"
  }
];

const Pictures = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollStartY = useRef(0);
  const lastSnapTime = useRef(0);

  const SCROLL_THRESHOLD = 150; // Minimum scroll distance required to change pictures
  const SNAP_COOLDOWN = 800; // Cooldown period between snaps in milliseconds

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      const now = Date.now();
      
      // Show/hide back to top button
      setShowBackToTop(currentScrollY > 300);
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      // Custom heavy scroll logic
      if (!isScrolling) {
        scrollStartY.current = currentScrollY;
        setIsScrolling(true);
      }

      // Check if enough distance has been scrolled and cooldown has passed
      const scrollDistance = Math.abs(currentScrollY - scrollStartY.current);
      const timeSinceLastSnap = now - lastSnapTime.current;
      
      if (scrollDistance > SCROLL_THRESHOLD && timeSinceLastSnap > SNAP_COOLDOWN) {
        const screenHeight = window.innerHeight;
        const direction = currentScrollY > scrollStartY.current ? 1 : -1;
        const newIndex = Math.max(0, Math.min(mockPictures.length - 1, currentPictureIndex + direction));
        
        if (newIndex !== currentPictureIndex) {
          setCurrentPictureIndex(newIndex);
          lastSnapTime.current = now;
          
          // Smooth scroll to the target picture
          scrollContainer.scrollTo({
            top: newIndex * screenHeight,
            behavior: 'smooth'
          });
          
          scrollStartY.current = newIndex * screenHeight;
        }
      }
    };

    const handleScrollEnd = () => {
      setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    scrollContainer.addEventListener('scrollend', handleScrollEnd, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [lastScrollY, currentPictureIndex, isScrolling]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      setCurrentPictureIndex(0);
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-inter">
      {/* Header with visibility control */}
      <header 
        className={`fixed top-0 left-0 right-0 bg-amber-50 z-50 transition-transform duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-12 lg:px-32 py-4">
          <nav className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <Link to="/" className="font-playfair text-xl md:text-2xl font-bold text-black tracking-wide hover:opacity-80 transition-opacity">
              ADITYA VENKAT
            </Link>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link to="/#about" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>About</Link>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Blogs</a>
              <span className="text-orange-900 font-medium text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Pictures</span>
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

      {/* Full Screen Picture Display with Vertical Scroll */}
      <div 
        ref={scrollContainerRef} 
        className="h-screen overflow-y-auto"
        style={{
          scrollBehavior: 'auto',
          scrollSnapType: 'none'
        }}
      >
        {mockPictures.map((picture, index) => (
          <div key={picture.id} className="h-screen snap-start relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={picture.src}
                alt={picture.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            {/* Subtle Frame with painted effect */}
            <div className="absolute inset-4 rounded-lg pointer-events-none">
              <div className="h-0.5 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-800 to-transparent opacity-50"
                     style={{
                       background: `linear-gradient(90deg, transparent 0%, #9a3412 30%, #7c2d12 50%, #9a3412 70%, transparent 100%)`,
                       filter: 'blur(0.3px) contrast(1.1)',
                       borderRadius: '30%'
                     }}>
                </div>
              </div>
              <div className="flex h-full">
                <div className="w-0.5 relative overflow-hidden mr-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-800 to-transparent opacity-50"
                       style={{
                         background: `linear-gradient(180deg, transparent 0%, #9a3412 30%, #7c2d12 50%, #9a3412 70%, transparent 100%)`,
                         filter: 'blur(0.3px) contrast(1.1)',
                         borderRadius: '30%'
                       }}>
                  </div>
                </div>
                <div className="flex-1"></div>
                <div className="w-0.5 relative overflow-hidden ml-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-800 to-transparent opacity-50"
                       style={{
                         background: `linear-gradient(180deg, transparent 0%, #9a3412 30%, #7c2d12 50%, #9a3412 70%, transparent 100%)`,
                         filter: 'blur(0.3px) contrast(1.1)',
                         borderRadius: '30%'
                       }}>
                  </div>
                </div>
              </div>
              <div className="h-0.5 relative overflow-hidden mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-800 to-transparent opacity-50"
                     style={{
                       background: `linear-gradient(90deg, transparent 0%, #9a3412 30%, #7c2d12 50%, #9a3412 70%, transparent 100%)`,
                       filter: 'blur(0.3px) contrast(1.1)',
                       borderRadius: '30%'
                     }}>
                </div>
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16">
              <div className="bg-amber-50 bg-opacity-5 backdrop-blur-sm p-8 rounded-lg max-w-lg">
                <h1 className="font-playfair text-3xl font-bold text-white mb-4 drop-shadow-lg">
                  {picture.title}
                </h1>
                <p className="text-sm uppercase tracking-wider text-amber-100 mb-3 drop-shadow">
                  {picture.location}
                </p>
                <p className="text-white leading-relaxed drop-shadow">
                  {picture.description}
                </p>
              </div>
            </div>

            {/* Picture Counter */}
            <div className="absolute top-8 right-8">
              <div className="bg-amber-50 bg-opacity-5 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-white drop-shadow">
                  {index + 1} / {mockPictures.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pictures;
