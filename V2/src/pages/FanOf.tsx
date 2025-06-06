import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Youtube, ExternalLink, Globe } from "lucide-react";

const FanOf = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide back to top button
      setShowBackToTop(currentScrollY > 300);
      
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Blog icon component
  const BlogIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );

  const blogs = [
    {
      name: "Wait But Why",
      description: "Tim Urban's deep dives into complex topics with stick figures and exceptional clarity. His posts on AI, space exploration, and human psychology have fundamentally shaped how I think about the future. The way he breaks down incredibly complex subjects into digestible, entertaining content is unmatched. His series on Neuralink and SpaceX gave me frameworks for understanding technological progress that I use daily. Every post feels like a masterclass in critical thinking and curiosity.",
      url: "https://waitbutwhy.com",
      category: "Blog",
      domain: "waitbutwhy.com",
      color: "#4CAF50"
    },
    {
      name: "Paul Graham",
      description: "The co-founder of Y Combinator writes essays that cut straight to the heart of startups, technology, and life philosophy. His writing style is deceptively simple yet profound - every sentence feels carefully crafted. His insights on building companies, making money, and thinking independently have influenced my approach to problem-solving. Reading his work feels like getting mentorship from someone who's seen it all and distilled the lessons into pure wisdom.",
      url: "https://paulgraham.com",
      category: "Blog",
      domain: "paulgraham.com",
      color: "#FF9800"
    },
    {
      name: "Naval",
      description: "Naval Ravikant's thoughts on wealth creation, happiness, and decision-making are like having a philosophical conversation with a modern sage. His ability to synthesize ancient wisdom with modern realities is remarkable. His tweetstorms and essays have taught me more about building wealth and finding contentment than most books. The depth of insight packed into short-form content is incredible - every piece demands multiple readings.",
      url: "https://nav.al",
      category: "Blog",
      domain: "nav.al",
      color: "#2196F3"
    },
    {
      name: "Stratechery",
      description: "Ben Thompson's analysis of technology strategy and business models is unparalleled in the tech commentary space. His framework for understanding how technology companies succeed or fail has become essential reading for anyone in tech. The way he connects historical patterns with current events gives me a much clearer lens for evaluating new companies and technologies. His daily updates keep me sharp on what's actually important in the tech world.",
      url: "https://stratechery.com",
      category: "Blog",
      domain: "stratechery.com",
      color: "#9C27B0"
    }
  ];

  const youtubeChannels = [
    {
      name: "Veritasium",
      description: "Derek Muller's approach to science communication is masterful - he makes complex physics and engineering concepts feel accessible and exciting. His videos consistently challenge my assumptions about how the world works. The production quality and depth of research behind each video is evident, and I always come away feeling like I understand something fundamental about reality a little better. His ability to find the counterintuitive angle on familiar topics is brilliant.",
      url: "https://youtube.com/@veritasium",
      category: "YouTube",
      domain: "youtube.com",
      color: "#F44336"
    },
    {
      name: "3Blue1Brown",
      description: "Grant Sanderson has revolutionized how I think about mathematics through his incredible visualizations. His ability to make abstract mathematical concepts feel intuitive and beautiful is unmatched. Every video feels like a revelation about the elegant patterns underlying our universe. The way he builds up complex ideas from simple foundations has influenced how I approach learning any new technical subject. Pure mathematical poetry in motion.",
      url: "https://youtube.com/@3blue1brown",
      category: "YouTube",
      domain: "youtube.com",
      color: "#FF5722"
    },
    {
      name: "Kurzgesagt",
      description: "The team at Kurzgesagt creates some of the most thoughtful and visually stunning science content on the internet. Their videos on topics like consciousness, space, and existential risks have given me frameworks for thinking about humanity's biggest challenges. The combination of rigorous research, beautiful animation, and philosophical depth makes each video feel like a journey. They tackle the biggest questions with both scientific rigor and genuine wonder.",
      url: "https://youtube.com/@kurzgesagt",
      category: "YouTube",
      domain: "youtube.com",
      color: "#607D8B"
    },
    {
      name: "Lex Fridman",
      description: "Lex's long-form conversations with brilliant minds across disciplines are like sitting in on graduate seminars with the world's leading thinkers. His ability to ask profound questions while remaining genuinely curious creates space for guests to share their deepest insights. The breadth of topics - from AI to philosophy to history - constantly expands my perspective. His thoughtful, patient interviewing style draws out ideas that wouldn't emerge in shorter formats.",
      url: "https://youtube.com/@lexfridman",
      category: "YouTube",
      domain: "youtube.com",
      color: "#795548"
    }
  ];

  const renderPreview = (item: any) => {
    return (
      <div className="flex-shrink-0 p-2 border rounded-md" style={{ borderColor: '#A0522D' }}>
        <div 
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ backgroundColor: item.color, opacity: 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-sm opacity-90"></div>
        </div>
      </div>
    );
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
            <Link to="/" className="font-playfair text-xl md:text-2xl font-bold text-black tracking-wide hover:opacity-80 transition-opacity">
              ADITYA VENKAT
            </Link>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link to="/#about" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>About</Link>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Blogs</a>
              <Link to="/pictures" className="text-orange-900 hover:text-orange-800 font-medium transition-colors text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Pictures</Link>
              <span className="text-orange-900 font-medium text-sm uppercase tracking-wider" style={{ color: '#8B4513' }}>Fan Of</span>
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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-12 lg:px-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Fan Of
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
                Creators and thinkers who shape my worldview
              </p>
            </div>
          </div>
        </section>

        {/* Painted line separator */}
        <div className="mx-12 lg:mx-32 mb-16">
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

        {/* Blogs Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-12 lg:px-32">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center">
                Blogs & Essays
              </h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {blogs.map((blog, index) => (
                  <a
                    key={index}
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 border-2 rounded-lg hover:bg-amber-100 transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: '#D2B48C' }}
                  >
                    <div className="flex items-start gap-4">
                      {renderPreview(blog)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-black group-hover:text-gray-800 transition-colors">
                          {blog.name}
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                          {blog.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Channels Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-12 lg:px-32">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-8 text-center">
                YouTube Channels
              </h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {youtubeChannels.map((channel, index) => (
                  <a
                    key={index}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 border-2 rounded-lg hover:bg-amber-100 transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: '#D2B48C' }}
                  >
                    <div className="flex items-start gap-4">
                      {renderPreview(channel)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-black group-hover:text-gray-800 transition-colors">
                          {channel.name}
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                          {channel.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Connect Note */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-12 lg:px-32">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                Think I should check out a cool blog, or a website? <Link to="/#connect" className="underline hover:opacity-80 transition-opacity" style={{ color: '#8B4513' }}>Drop me a note!</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

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

      {/* Footer */}
      <footer className="bg-black text-white py-3">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="font-playfair text-xl font-bold text-white hover:text-gray-300 transition-colors">
              ADITYA VENKAT
            </Link>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link to="/#about" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">About</Link>
              <a href="https://placeholder-blog.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Blogs</a>
              <Link to="/pictures" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">Pictures</Link>
              <span className="text-white text-sm uppercase tracking-wider">Fan Of</span>
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

export default FanOf;
