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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTime, setSubmitTime] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const location = useLocation();

  // Character limits
  const COMMENT_MAX_LENGTH = 300;
  const NAME_MAX_LENGTH = 100;

  // Enhanced email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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

  // Set submit time when form is first interacted with (spam prevention)
  useEffect(() => {
    if (!submitTime && (formData.name || formData.email || formData.comment)) {
      setSubmitTime(Date.now());
    }
  }, [formData, submitTime]);

  // Handle clicking home link while already on home page
  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length > NAME_MAX_LENGTH) return `Name must be ${NAME_MAX_LENGTH} characters or less`;
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        if (value.length > 254) return 'Email address is too long';
        return '';
      
      case 'comment':
        if (!value.trim()) return 'Comment is required';
        if (value.length > COMMENT_MAX_LENGTH) return `Comment must be ${COMMENT_MAX_LENGTH} characters or less`;
        if (value.trim().length < 10) return 'Comment must be at least 10 characters long';
        // Check for spam-like patterns
        if (/(.)\1{4,}/.test(value)) return 'Comment contains invalid repeated characters';
        if ((value.match(/https?:\/\//g) || []).length > 2) return 'Comment cannot contain multiple links';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Prevent exceeding character limits
    if (name === 'comment' && value.length > COMMENT_MAX_LENGTH) return;
    if (name === 'name' && value.length > NAME_MAX_LENGTH) return;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent rapid submissions (spam protection)
    if (submitTime && Date.now() - submitTime < 3000) {
      alert('Please wait a moment before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    // Validate all fields
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      comment: validateField('comment', formData.comment)
    };

    setFormErrors(errors);

    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      setIsSubmitting(false);
      return;
    }

    // Check honeypot field
    const honeypot = (e.target as HTMLFormElement).website?.value;
    if (honeypot) {
      // Bot detected, silently reject
      setIsSubmitting(false);
      return;
    }

    try {
      // Google Form submission with your specific form ID
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1-TyT9cmwE_TgWPKBH3apV3Sq-y1toge_SwCOM65J7nE/formResponse';
      
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('entry.100699228', formData.name);
      formDataToSubmit.append('entry.2075906330', formData.email);
      formDataToSubmit.append('entry.1946675324', formData.comment);

      // Submit to Google Form using fetch with no-cors mode
      // This is the standard, safe way to integrate with Google Forms
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors', // Bypasses CORS restrictions
      });

      // Success message - we assume success since we can't read the response
      alert(`Thank you for your message, ${formData.name}! I'll get back to you soon.`);
      
      // Reset form
      setFormData({ name: '', email: '', comment: '' });
      setSubmitTime(null);
      
    } catch (error) {
      // Only log errors, not user data
      console.error('Form submission failed');
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={NAME_MAX_LENGTH}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm bg-amber-50 focus:outline-none focus:ring-2 transition-colors ${
                      formErrors.name 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-amber-600'
                    }`}
                    style={{ '--tw-ring-color': formErrors.name ? '#fee2e2' : '#8B4513' } as React.CSSProperties}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.name.length}/{NAME_MAX_LENGTH} characters
                  </p>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm bg-amber-50 focus:outline-none focus:ring-2 transition-colors ${
                      formErrors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-amber-600'
                    }`}
                    style={{ '--tw-ring-color': formErrors.email ? '#fee2e2' : '#8B4513' } as React.CSSProperties}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    maxLength={COMMENT_MAX_LENGTH}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm bg-amber-50 focus:outline-none focus:ring-2 resize-vertical transition-colors ${
                      formErrors.comment 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-amber-600'
                    }`}
                    style={{ '--tw-ring-color': formErrors.comment ? '#fee2e2' : '#8B4513' } as React.CSSProperties}
                    placeholder="Share your thoughts, ideas, or questions... (minimum 10 characters)"
                  />
                  {formErrors.comment && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.comment}</p>
                  )}
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Minimum 10 characters</span>
                    <span className={formData.comment.length > COMMENT_MAX_LENGTH - 50 ? 'text-orange-600' : ''}>
                      {formData.comment.length}/{COMMENT_MAX_LENGTH} characters
                    </span>
                  </div>
                </div>
                
                {/* Enhanced honeypot fields for spam prevention */}
                <div style={{ display: 'none' }}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    name="phone"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  * Required fields. Your information will be kept private and secure.
                </p>
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
