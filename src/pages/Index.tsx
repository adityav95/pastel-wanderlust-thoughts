import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

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

  // Handle hash navigation when component mounts
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If no hash, scroll to top (fresh page load experience)
      window.scrollTo(0, 0);
    }
  }, []);

  // Handle clicking home link while already on home page
  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submitted successfully
    alert(`Thank you for your message, ${formData.name}!`);
    // Reset form
    setFormData({ name: '', email: '', comment: '' });
  };

  // Custom Substack icon component with proper typing
  const SubstackIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h18v4H3z"/>
      <path d="M3 9h18v4H3z"/>
      <path d="M3 15h18v6H3z"/>
    </svg>
  );

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
              <a href="#about" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>About</a>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Blogs</a>
              <Link to="/pictures" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Pictures</Link>
              <Link to="/fan-of" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Fan Of</Link>
              <a href="#connect" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Connect</a>
            </div>
          </nav>
        </div>
        {/* Painted line separator with handpainted effect */}
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

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              A nook for my
              <br />
              <span className="font-bold" style={{ color: '#8B4513' }}>
                Explorations
              </span>
              <br />
              & Ideas.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-1 leading-relaxed max-w-2xl mx-auto">
            I help the curious wade through the noisy waters to their signal.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            At least I try, therefore I am.
            </p>
          </div>
        </div>
      </section>

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

      {/* About Section */}
      <section id="about" className="bg-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-black mb-8 text-center md:text-left">
              About
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
              {/* Mobile: Photo first */}
              <div className="md:hidden flex justify-center">
                <img 
                  src="/aditya.jpg" 
                  alt="Aditya Venkat"
                  className="w-72 h-72 object-cover rounded-lg shadow-lg"
                />
              </div>
              
              {/* Text content */}
              <div className="md:col-span-2">
                <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    Hi! I'm Aditya. Hailing from the little village of Bangalore, India, I dream of us humans becoming a multi-planetary species one day and walking around with chips in our brains to live life at 100x. Some days, I contemplate retiring young and getting into agriculture :D
                  </p>
                  <p>
                    I care about understanding various phenomena to improve my mental models of reality. By happy chance, I am a data scientist (at <a href="https://sundial.so/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 transition-opacity" style={{ color: '#8B4513' }}>Sundial</a>), a role I enjoy a fair bit and this makes it a little hard for me to fully comprehend the dreaded Monday blues.
                  </p>
                  <p>
                    When I'm not working or doing my chores, I spend my time generally tinkering with stuff around the house, playing video games, reading and surfing the web. Maybe writing for this website will be another addition to the list.
                  </p>
                  <p>
                    When I've got more time on my hands, I travel, wine, dine and pontificate with my friends. Often, I just go for a long drive. I love cars and driving them. It's one of those passions that are not easily expressed through the written word.
                  </p>
                  <p>
                    If any of this resonates with you, <a href="#connect" className="underline hover:opacity-80 transition-opacity" style={{ color: '#8B4513' }}>drop a note</a>. I'd love to chat.
                  </p>
                </div>
              </div>
              
              {/* Desktop: Photo on right */}
              <div className="hidden md:flex justify-center md:justify-start">
                <img 
                  src="/aditya.jpg" 
                  alt="Aditya Venkat"
                  className="w-72 h-72 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Painted line separator */}
      <div className="mx-12 lg:mx-32">
        <div className="h-0.5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-80"
               style={{
                 background: `linear-gradient(90deg, transparent 8%, #8B4513 18%, #A0522D 28%, #8B4513 38%, #A0522D 48%, #8B4513 58%, #A0522D 68%, #8B4513 78%, #A0522D 88%, transparent 100%)`,
                 filter: 'blur(0.4px)',
                 transform: 'scaleY(0.7) rotate(-0.2deg)',
                 borderRadius: '1px'
               }}>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <section id="connect" className="bg-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-black mb-8 text-center">
              Connect
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed text-center">
              I'm a little shy but don't let that stop you from dropping a Hi!
            </p>
            
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6 bg-amber-50 p-6 md:p-8 rounded-lg shadow-lg border border-amber-200">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-amber-50 focus:outline-none focus:ring-2 focus:border-amber-600"
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-amber-50 focus:outline-none focus:ring-2 focus:border-amber-600"
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-amber-50 focus:outline-none focus:ring-2 focus:border-amber-600 resize-vertical"
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                    placeholder="Share your thoughts, ideas, or questions..."
                  />
                </div>
                
                {/* Simple honeypot field to prevent basic bots */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <button 
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-amber-50 py-8">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <a href="https://www.instagram.com/aditya_venkat/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-md hover:bg-amber-100 transition-colors" style={{ borderColor: '#A0522D' }}>
              <Instagram className="w-6 h-6" style={{ color: '#A0522D' }} fill="none" />
            </a>
            <a href="https://www.linkedin.com/in/aditya-venkat/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-md hover:bg-amber-100 transition-colors" style={{ borderColor: '#A0522D' }}>
              <Linkedin className="w-6 h-6" style={{ color: '#A0522D' }} fill="none" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-md hover:bg-amber-100 transition-colors" style={{ borderColor: '#A0522D' }}>
              <Youtube className="w-6 h-6" style={{ color: '#A0522D' }} fill="none" />
            </a>
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-md hover:bg-amber-100 transition-colors" style={{ borderColor: '#A0522D' }}>
              <SubstackIcon className="w-6 h-6" style={{ color: '#A0522D' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-3">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" onClick={handleHomeClick} className="font-playfair text-xl font-bold text-white hover:text-gray-300 transition-colors">
              ADITYA VENKAT
            </Link>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <a href="#about" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">About</a>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Blogs</a>
              <Link to="/pictures" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Pictures</Link>
              <Link to="/fan-of" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Fan Of</Link>
              <a href="#connect" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Connect</a>
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

export default Index;
