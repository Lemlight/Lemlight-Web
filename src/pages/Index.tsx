import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { ChevronLeft, ChevronRight, Star, Phone, Menu, X, ArrowUp, Send } from "lucide-react";
import OrderSimulation from "../components/OrderSimulation";
import LoadingScreen from "../components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [showCookieDialog, setShowCookieDialog] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Loading timer ──────────────────────────────────────────────────
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowComingSoon(true);

      // ── Hero 3D entrance (runs after loading screen clears) ──────────
      const heroCtx = gsap.context(() => {
        // Badge drops in with depth
        gsap.fromTo(heroBadgeRef.current,
          { z: -300, opacity: 0, rotateX: -60, transformPerspective: 900 },
          { z: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: "back.out(2)", delay: 0.1 }
        );

        // Title words flip in one by one on Y-axis
        if (heroTitleRef.current) {
          const words = heroTitleRef.current.querySelectorAll(".word");
          gsap.fromTo(words,
            { rotateY: 90, opacity: 0, transformPerspective: 800, transformOrigin: "left center" },
            { rotateY: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.5)", delay: 0.3 }
          );
        }

        // Sub-text slides in from depth
        gsap.fromTo(heroSubRef.current,
          { z: -150, opacity: 0, transformPerspective: 700 },
          { z: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
        );

        // Buttons scale in with 3D bounce
        gsap.fromTo(heroBtnsRef.current,
          { rotateX: 30, y: 40, opacity: 0, transformPerspective: 600 },
          { rotateX: 0, y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 1.1 }
        );

        // Hero image panel swings in from right on Z
        gsap.fromTo(heroImageRef.current,
          { rotateY: -40, z: -200, opacity: 0, transformPerspective: 1200, transformOrigin: "right center" },
          { rotateY: 0, z: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.4 }
        );

        // Floating courier card pops in
        gsap.fromTo(floatingCardRef.current,
          { scale: 0.5, rotateZ: -15, opacity: 0, transformPerspective: 600 },
          { scale: 1, rotateZ: 0, opacity: 1, duration: 0.8, ease: "back.out(2)", delay: 1.4 }
        );
      });

      return () => heroCtx.revert();
    }, 2000);

    // ── Scroll reveal (CSS-based, kept for non-GSAP elements) ──────────
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up");
      });
    }, observerOptions);
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // ── GSAP ScrollTrigger 3D animations ──────────────────────────────
    const featureCtx = gsap.context(() => {
      // Feature icons: Y-axis spin on scroll
      gsap.utils.toArray<HTMLElement>(".feature-icon").forEach((el, i) => {
        gsap.fromTo(el,
          { rotateY: -180, opacity: 0, transformPerspective: 600, scale: 0.7 },
          {
            rotateY: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Section headers: emerge from depth
      gsap.utils.toArray<HTMLElement>(".section-header").forEach((el) => {
        gsap.fromTo(el,
          { z: -180, opacity: 0, rotateX: 20, transformPerspective: 1000 },
          {
            z: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Testimonial image: barrel-roll in
      const testimImg = document.querySelector(".testimonial-image");
      if (testimImg) {
        gsap.fromTo(testimImg,
          { rotateY: 45, z: -300, opacity: 0, transformPerspective: 1200, transformOrigin: "left center" },
          {
            rotateY: 0, z: 0, opacity: 1, duration: 1.2, ease: "power4.out",
            scrollTrigger: { trigger: testimImg, start: "top 80%" },
          }
        );
      }

      // Download app mockup: flip up from below
      const mockup = document.querySelector(".app-mockup");
      if (mockup) {
        gsap.fromTo(mockup,
          { rotateX: 60, z: -200, opacity: 0, transformPerspective: 900, transformOrigin: "bottom center" },
          {
            rotateX: 0, z: 0, opacity: 1, duration: 1.1, ease: "back.out(1.4)",
            scrollTrigger: { trigger: mockup, start: "top 82%" },
          }
        );
      }

      // FAQ items: stagger slide in from left with depth
      gsap.utils.toArray<HTMLElement>(".faq-item").forEach((el, i) => {
        gsap.fromTo(el,
          { x: -60, z: -100, rotateY: 15, opacity: 0, transformPerspective: 700 },
          {
            x: 0, z: 0, rotateY: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    });

    // ── Menu card 3D tilt on hover ─────────────────────────────────────
    const menuCards = document.querySelectorAll<HTMLElement>(".menu-card");
    const menuCleanups: (() => void)[] = [];

    menuCards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
        gsap.to(card, { rotateY: x, rotateX: y, transformPerspective: 900, scale: 1.03, duration: 0.25, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.55, ease: "elastic.out(1, 0.5)" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      menuCleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    // ── Scroll to top button ───────────────────────────────────────────
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(loadingTimer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      menuCleanups.forEach((fn) => fn());
      featureCtx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [cookiesAccepted]);

  const handleDismissComingSoon = () => {
    setShowComingSoon(false);
    if (!cookiesAccepted) setShowCookieDialog(true);
  };

  const handleAcceptCookies = () => { setCookiesAccepted(true); setShowCookieDialog(false); };
  const handleDeclineCookies = () => setShowCookieDialog(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
    setShowContactForm(false);
  };

  const menuItems = [
    { name: "Italian Pizza",  price: "700.49", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
    { name: "Sausage Pizza",  price: "600.59", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
    { name: "Burger Combo",   price: "800.99", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { name: "Pasta Special",  price: "900.49", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80" },
  ];

  const faqItems = [
    { question: "How do I place an order?",            answer: "You can place an order through our mobile app or website. Simply browse the menu, add items to your cart, and checkout. Delivery is fast and free!" },
    { question: "What are the delivery charges?",      answer: "We offer free delivery on all orders! No hidden charges, just quality food delivered straight to your door." },
    { question: "How long does delivery take?",        answer: "Our average delivery time is 30-45 minutes. We guarantee the fastest delivery in town with fresh, hot food." },
    { question: "Can I track my order?",               answer: "Yes! Once your order is confirmed, you'll receive real-time updates on your delivery status through our app." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit cards, digital wallets, and cash on delivery options." },
    { question: "Is the food fresh?",                  answer: "Absolutely! We partner with premium restaurants and ensure all food is prepared fresh and delivered at optimal temperature." },
  ];

  const scrollMenu = (direction: "left" | "right") => {
    const container = document.getElementById("menu-scroll-container");
    if (container) {
      const newPosition = direction === "left" ? container.scrollLeft - 450 : container.scrollLeft + 450;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Navigation ──────────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
          <div className="w-full px-4 md:px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-24 h-12 bg-[#077a69] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  <div className="text-center leading-tight w-20">
                    <img src="./logo/logo.png" loading="lazy" alt="lemtight-logo" className="w-46" />
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => scrollToSection("why-Lemtight")} className="text-sm font-medium text-brand-teal cursor-pointer hover:text-brand-teal/80 transition-colors">Why Lemtight</button>
                <button onClick={() => scrollToSection("services")}     className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-teal transition-colors">Services</button>
                <button onClick={() => scrollToSection("faq")}          className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-teal transition-colors">FAQ</button>
                <button onClick={() => setShowContactForm(true)}        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-teal transition-colors">Contact Us</button>
              </div>

              <Button className="hidden md:inline-flex bg-[#077a69] cursor-pointer hover:bg-[#077a69]/90 text-white">Coming Soon</Button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden border-t mt-4 pt-4 space-y-3">
                <button onClick={() => scrollToSection("why-Lemtight")} className="block w-full text-left px-4 py-2 text-sm font-medium text-brand-teal hover:bg-gray-50 rounded transition-colors">Why Lemtight</button>
                <button onClick={() => scrollToSection("services")}     className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors">Services</button>
                <button onClick={() => scrollToSection("faq")}          className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors">FAQ</button>
                <button onClick={() => setShowContactForm(true)}        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors">Contact Us</button>
                <Button className="w-full bg-[#077a69] hover:bg-[#077a69]/90 text-white mt-2">Login</Button>
              </div>
            )}
          </div>
        </nav>

        {/* ── Hero Section ─────────────────────────────────────────────── */}
        <section className="relative bg-[#077a69] pt-32 pb-16 md:pb-24 overflow-hidden">
          {/* Decorative background depth shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"></div>
            <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-white/5"></div>
            <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-[#fbcb32]/10"></div>
          </div>

          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Hero Content */}
                <div className="space-y-6 text-white">
                  <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 rounded-full backdrop-blur-sm opacity-0">
                    <span className="text-sm font-medium">More than Faster</span>
                    <svg className="w-5 h-5" viewBox="0 0 20 18" fill="#fbcb32">
                      <path d="M10 0L12.39 6.26L19.18 7.27L14.59 11.78L15.82 18.54L10 15.27L4.18 18.54L5.41 11.78L0.82 7.27L7.61 6.26L10 0Z"/>
                    </svg>
                  </div>

                  {/* Title — each word wrapped for GSAP 3D word-flip */}
                  <h1 ref={heroTitleRef} className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight" style={{ perspective: "800px" }}>
                    {["Claim","Best","Offer","on","Fast"].map((w) => (
                      <span key={w} className="word inline-block mr-[0.25em] opacity-0">{w}</span>
                    ))}{" "}
                    <span className="word inline-block mr-[0.25em] opacity-0 text-[#fbcb32]">Food</span>
                    <span className="word inline-block mr-[0.25em] opacity-0">&</span>
                    <span className="word inline-block opacity-0 text-[#fbcb32]">Restaurants</span>
                  </h1>

                  <p ref={heroSubRef} className="text-lg md:text-xl text-white/90 max-w-lg opacity-0">
                    Our job is to filling your tummy with delicious food and with fast and free delivery
                  </p>

                  <div ref={heroBtnsRef} className="flex flex-wrap gap-4 items-center pt-4 opacity-0">
                    <Button size="lg" className="bg-white text-[#077a69] hover:bg-white/90 font-medium px-8">Get Started</Button>
                    <button className="flex items-center gap-3 group">
                      <div className="w-12 h-12 rounded-full bg-[#fbcb32] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <img src='/playstore.png' alt='playstore' className='w-5 h-5' />
                      </div>
                      <span className="font-medium cursor-pointer">Coming Soon</span>
                    </button>
                  </div>
                </div>

                {/* Hero Image — video removed, replaced with styled food grid panel */}
                <div ref={heroImageRef} className="relative opacity-0">
                  <div className="relative z-10">
                    <div className="w-full rounded-3xl overflow-hidden relative min-h-[420px] flex items-center justify-center">
                      {/* Decorative rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-80 h-80 rounded-full border border-white/10"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-56 h-56 rounded-full border border-white/10"></div>
                      </div>
                      {/* Central glow */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-40 h-40 rounded-full bg-[#fbcb32]/20 blur-3xl"></div>
                      </div>
                      {/* Food emoji grid — swap with a real hero image if available */}
                      {/* <div className="grid grid-cols-3 gap-5 p-10 relative z-10">
                        {["🍕","🍔","🍝","🌮","🍜","🍣","🥗","🍱","🧆"].map((emoji, i) => (
                          <div key={i} className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg hover:scale-110 hover:bg-white/20 transition-all duration-200 cursor-default">
                            {emoji}
                          </div>
                        ))}
                      </div> */}
                      <video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-auto rounded-3xl"
>
  <source src="/lemlight-vid.webm" type="video/webm" />
  <source src="/lemlight-vid.mp4" type="video/mp4" />
</video>
                    </div>

                    {/* Floating courier card */}
                    <div ref={floatingCardRef} className="absolute bottom-8 left-0 bg-white rounded-2xl shadow-xl p-4 animate-float opacity-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-100">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Richard" alt="Courier" className="w-full h-full rounded-full" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Richard Amabo</p>
                          <p className="text-xs text-gray-500">Food Courier</p>
                        </div>
                        <button className="ml-4 w-10 h-10 rounded-full bg-[#077a69] flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-10 right-10 w-4 h-4 bg-[#fbcb32] rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 right-0 w-3 h-3 bg-white rounded-full animate-pulse delay-100"></div>
                </div>
              </div>

              {/* Customer Reviews */}
              <div className="reveal flex flex-wrap items-center gap-6 mt-16 text-white">
                <div className="flex -space-x-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt={`Customer ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-lg">Our Happy Customer</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
                    <span className="font-medium">4.8</span>
                    <span className="text-white/70">(12.5k Review)</span>
                  </div>
                </div>
              </div>

              <OrderSimulation />
            </div>
          </div>
        </section>

        {/* ── What We Serve ────────────────────────────────────────────── */}
        <section id="why-Lemtight" className="py-20 md:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-brand-teal font-semibold tracking-wider uppercase mb-4">WHAT WE SERVE</p>
                <h2 className="section-header text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
                  Your Favourite Food Delivery Partner
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {[
                  { src: "/i2.svg", alt: "Easy to Order",    title: "Easy To Order",    desc: "You only need a few steps in ordering food" },
                  { src: "i1.svg",  alt: "Fastest Delivery", title: "Fastest Delivery", desc: "Delivery that is always ontime even faster" },
                  { src: "i4.svg",  alt: "Best Quality",     title: "Best Quality",     desc: "Not only fast for us quality is also number one" },
                ].map(({ src, alt, title, desc }, i) => (
                  <div key={i} className="text-center">
                    <div className="mb-6 flex justify-center">
                      <img src={src} alt={alt} className="feature-icon w-48 h-48" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 text-lg">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Menu ─────────────────────────────────────────────────── */}
        <section id="services" className="py-20 md:py-32 bg-gray-50">
          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <p className="text-brand-teal font-semibold tracking-wider uppercase mb-4">OUR MENU</p>
                <h2 className="section-header text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl leading-tight">
                  Menu That Always Makes You Fall In Love
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 mb-8 reveal">
                {["Pizza","Burger","Cupcake","Ramen","Ice Cream"].map((cat, i) => (
                  <button key={cat} className={`px-6 py-3 rounded-full font-medium transition-colors ${i === 0 ? "bg-[#077a69] text-white shadow-lg hover:bg-[#077a69]/90" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="hidden md:flex absolute right-0 -top-20 gap-3 z-10">
                  <button onClick={() => scrollMenu("left")}  className="w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                  <button onClick={() => scrollMenu("right")} className="w-16 h-16 rounded-full bg-[#077a69] hover:bg-[#077a69]/90 flex items-center justify-center transition-colors"><ChevronRight className="w-6 h-6 text-white" /></button>
                </div>

                <div id="menu-scroll-container" className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {menuItems.map((item, index) => (
                    <div key={index} className="menu-card flex-shrink-0 w-80 md:w-96 rounded-3xl overflow-hidden shadow-xl cursor-pointer relative h-[500px]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                        <h3 className="text-3xl font-medium mb-3">{item.name}</h3>
                        <p className="text-3xl font-bold mb-4"><span className="text-brand-yellow">₦</span> {item.price}</p>
                        <button className="flex items-center gap-2 text-lg font-medium hover:gap-4 transition-all">Order Now <ChevronRight className="w-6 h-6" /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex md:hidden justify-center gap-3 mt-6">
                  <button onClick={() => scrollMenu("left")}  className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center"><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={() => scrollMenu("right")} className="w-14 h-14 rounded-full bg-[#077a69] flex items-center justify-center"><ChevronRight className="w-5 h-5 text-white" /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="testimonial-image rounded-[80px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80" alt="Chef" className="w-full h-[600px] object-cover" />
                  </div>
                </div>
                <div className="reveal space-y-6">
                  <p className="text-brand-teal font-semibold tracking-wider uppercase">WHAT THEY SAY</p>
                  <h2 className="section-header text-3xl md:text-5xl font-bold text-gray-900 leading-tight">What Our Customers Say About Us</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    "Lemtight is the best. Besides the many and delicious meals, the service is also very good, especially in the very fast delivery. I highly recommend Lemtight to you".
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa" alt="Theresa Jordan" className="w-full h-full" />
                    </div>
                    <div>
                      <p className="font-medium text-lg text-gray-900">Theresa Jordan</p>
                      <p className="text-gray-500">Food Enthusiast</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="w-6 h-6 fill-[#fbcb32] text-[#fbcb32]" />)}
                    <span className="ml-2 font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="py-20 md:py-32 bg-gray-50">
          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-brand-teal font-semibold tracking-wider uppercase mb-4">Got Questions?</p>
                <h2 className="section-header text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqItems.map((item, index) => (
                  <details key={index} className="faq-item group border border-gray-200 rounded-lg p-6 bg-white hover:border-brand-teal transition-colors cursor-pointer">
                    <summary className="flex items-center justify-between font-semibold text-gray-900 select-none">
                      <span className="text-lg">{item.question}</span>
                      <svg className="w-5 h-5 text-brand-teal group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Download App ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-32 bg-orange-50">
          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-orange-100/50 rounded-[30px] p-8 md:p-16 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="reveal space-y-6">
                    <p className="text-brand-teal font-semibold tracking-wider uppercase">DOWNLOAD APP</p>
                    <h2 className="section-header text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Get Started With Lemtight Today!</h2>
                    <p className="text-lg text-gray-600">Discover food wherever and whenever and get your food delivered quickly.</p>
                    <Button size="lg" className="bg-[#077a69] hover:bg-[#077a69]/90 text-white px-8">Get The App</Button>
                  </div>
                  <div className="relative">
                    <div className="app-mockup bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
                      <div className="aspect-[9/16] bg-gradient-to-b from-orange-100 to-white rounded-2xl flex items-center justify-center">
                        <img src='/p1.png' loading="lazy" alt='mockup' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer id="contact" className="bg-white pt-20 pb-8 border-t">
          <div className="w-full px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-12">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-24 h-12 bg-[#077a69] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      <div className="text-center leading-tight">
                        <img src="./logo/logo.png" loading="lazy" alt="lemtight-logo" className="w-46" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">Our job is to filling your tummy with delicious food and with fast and free delivery.</p>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#077a69] hover:text-white transition-colors cursor-pointer text-xs">f</div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#077a69] hover:text-white transition-colors cursor-pointer text-xs">𝕏</div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#077a69] hover:text-white transition-colors cursor-pointer text-xs">in</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">About</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {["About Us","Features","News","Menu"].map(l => <li key={l} className="hover:text-brand-teal cursor-pointer transition-colors">{l}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Company</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {["Why Lemtight?","Partner With Us","FAQ","Blog"].map(l => <li key={l} className="hover:text-brand-teal cursor-pointer transition-colors">{l}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Support</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {["Account","Support Center","Feedback"].map(l => <li key={l} className="hover:text-brand-teal cursor-pointer transition-colors">{l}</li>)}
                    <li onClick={() => setShowContactForm(true)} className="hover:text-brand-teal cursor-pointer transition-colors">Contact Us</li>
                    <li className="hover:text-brand-teal cursor-pointer transition-colors">Accessibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Get in Touch</h3>
                  <p className="text-gray-600 mb-4 text-sm">Question or feedback? We'd love to hear from you</p>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Email Address" className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal" />
                    <button className="w-10 h-10 bg-[#077a69] rounded-full flex items-center justify-center text-white hover:bg-[#077a69]/90 transition-colors flex-shrink-0">→</button>
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-500 text-sm pt-8 border-t">
                © {new Date().getFullYear()} Lemtight. All rights reserved.
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button onClick={scrollToTop} className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#077a69] text-white flex items-center justify-center shadow-lg hover:bg-[#077a69]/90 transition-colors animate-bounce-slow z-40" aria-label="Scroll to top">
            <ArrowUp className="w-6 h-6" />
          </button>
        )}

        {/* ── Coming Soon Modal ────────────────────────────────────────── */}
        <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
          <DialogContent className="sm:max-w-md bg-white overflow-hidden p-0" onInteractOutside={(e) => e.preventDefault()}>
            <div className="bg-[#077a69] px-8 pt-8 pb-10 text-white text-center relative">
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/10"></div>
              <div className="absolute bottom-2 right-6 w-10 h-10 rounded-full bg-[#fbcb32]/30"></div>
              <div className="absolute top-10 right-10 w-5 h-5 rounded-full bg-white/20"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 ring-4 ring-white/10">
                  <img src="/logo/logo.png" alt="Coming Soon" className="w-[100] h-[100]" />
                </div>
                <DialogTitle className="text-3xl font-bold text-white mb-1">Coming Soon!</DialogTitle>
                <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Lemtight is almost ready</p>
              </div>
            </div>
            <div className="px-8 py-6 text-center space-y-4">
              <DialogDescription className="text-gray-600 text-base leading-relaxed">
                We're putting the finishing touches on something delicious. Lemtight — your fastest food delivery experience, is launching very soon. Stay tuned and be the first to know!
              </DialogDescription>
              <div className="flex justify-center gap-2 py-1">
                <span className="w-2 h-2 rounded-full bg-[#077a69]"></span>
                <span className="w-2 h-2 rounded-full bg-[#fbcb32]"></span>
                <span className="w-2 h-2 rounded-full bg-[#077a69]"></span>
              </div>
            </div>
            <DialogFooter className="px-8 pb-8 flex-col gap-3">
              <Button onClick={handleDismissComingSoon} className="w-full bg-[#077a69] hover:bg-[#077a69]/90 text-white font-semibold py-3 rounded-xl text-base">
                Got it, take me in! 🚀
              </Button>
              <p className="text-center text-xs text-gray-400">You'll be notified when we go live.</p>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Contact Form Modal ───────────────────────────────────────── */}
        <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Get In Touch With Us</DialogTitle>
              <DialogDescription>Send us a message and we'll get back to you as soon as possible.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Message</label>
                <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none h-32" placeholder="Your message..." />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" className="cursor-pointer hover:bg-gray-100 text-gray-900" onClick={() => setShowContactForm(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#077a69] hover:bg-[#077a69]/90 cursor-pointer text-white">
                  <Send className="w-4 h-4 mr-2" />Send Message
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* ── Cookie Dialog ────────────────────────────────────────────── */}
        <Dialog open={showCookieDialog} onOpenChange={setShowCookieDialog}>
          <DialogContent className="bg-white sm:max-w-md bottom-4 top-auto translate-y-0 data-[state=open]:slide-in-from-bottom-full">
            <DialogHeader>
              <DialogTitle>🍪 Cookie Notice</DialogTitle>
              <DialogDescription>We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-row gap-2">
              <Button variant="outline" onClick={handleDeclineCookies} className="flex-1 cursor-pointer">Decline</Button>
              <Button onClick={handleAcceptCookies} className="flex-1 bg-[#077a69] hover:bg-[#077a69]/90 cursor-pointer">Accept</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }

          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
          .reveal { opacity: 0; }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-10px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-10px); }
          }
          .animate-bounce-slow { animation: bounce-slow 1.5s infinite; }

          /* 3D rendering hints */
          .menu-card        { transform-style: preserve-3d; will-change: transform; }
          .feature-icon     { will-change: transform, opacity; }
          .section-header   { will-change: transform, opacity; }
          .testimonial-image{ will-change: transform, opacity; }
          .app-mockup       { will-change: transform, opacity; }
          .faq-item         { will-change: transform, opacity; }
          .word             { display: inline-block; will-change: transform, opacity; }
        `}</style>
      </div>
    </>
  );
}