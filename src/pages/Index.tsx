import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Play, ChevronLeft, ChevronRight, Star, Phone, Menu, X, ArrowUp, Send } from "lucide-react";
import OrderSimulation from "../components/OrderSimulation";
import LoadingScreen from "../components/LoadingScreen";

export default function Index() {
  const [showCookieDialog, setShowCookieDialog] = useState(false);
  const [menuScrollPosition, setMenuScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    // Show cookie dialog on mount
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setShowCookieDialog(true);
    }

    // Scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Show/hide scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookieDialog(false);
  };

  const handleDeclineCookies = () => {
    setShowCookieDialog(false);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setShowContactForm(false);
  };

  const menuItems = [
    {
      name: "Italian Pizza",
      price: "700.49",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    },
    {
      name: "Sausage Pizza",
      price: "600.59",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
    },
    {
      name: "Burger Combo",
      price: "800.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    },
    {
      name: "Pasta Special",
      price: "900.49",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80",
    },
  ];

  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "You can place an order through our mobile app or website. Simply browse the menu, add items to your cart, and checkout. Delivery is fast and free!"
    },
    {
      question: "What are the delivery charges?",
      answer: "We offer free delivery on all orders! No hidden charges, just quality food delivered straight to your door."
    },
    {
      question: "How long does delivery take?",
      answer: "Our average delivery time is 30-45 minutes. We guarantee the fastest delivery in town with fresh, hot food."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order is confirmed, you'll receive real-time updates on your delivery status through our app."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, digital wallets, and cash on delivery options."
    },
    {
      question: "Is the food fresh?",
      answer: "Absolutely! We partner with premium restaurants and ensure all food is prepared fresh and delivered at optimal temperature."
    },
  ];

  const scrollMenu = (direction: "left" | "right") => {
    const container = document.getElementById("menu-scroll-container");
    if (container) {
      const scrollAmount = 450;
      const newPosition = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setMenuScrollPosition(newPosition);
    }
  };

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="w-full px-4 md:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-24 h-12 bg-[#077a69] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                <div className="text-center leading-tight w-20">
                  <img src="./logo/logo.png" loading="lazy" alt="lemtight-logo" className="w-46" />
                </div>
              </div>
              {/* <span className="text-xl md:text-2xl font-semibold text-gray-900">Lemtight</span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("why-Lemtight")}
                className="text-sm font-medium text-brand-teal cursor-pointer hover:text-brand-teal/80 transition-colors"
              >
                Why Lemtight
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-teal transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-teal transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-teal transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Desktop Login Button */}
            <Button className="hidden md:inline-flex bg-[#077a69] cursor-pointer hover:bg-[#077a69]/90 text-white">
              Login
            </Button>

            {/* Mobile Hamburger Menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t mt-4 pt-4 space-y-3">
              <button
                onClick={() => scrollToSection("why-Lemtight")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-brand-teal hover:bg-gray-50 rounded transition-colors"
              >
                Why Lemtight
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
              >
                Contact Us
              </button>
              <Button className="w-full bg-[#077a69] hover:bg-[#077a69]/90 text-white mt-2">
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#077a69] pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="reveal space-y-6 text-white">
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium">More than Faster</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 18" fill="#fbcb32">
                    <path d="M10 0L12.39 6.26L19.18 7.27L14.59 11.78L15.82 18.54L10 15.27L4.18 18.54L5.41 11.78L0.82 7.27L7.61 6.26L10 0Z"/>
                  </svg>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Claim Best Offer on Fast{" "}
                  <span className="text-[#fbcb32]">Food</span> &{" "}
                  <span className="text-[#fbcb32]">Restaurants</span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 max-w-lg">
                  Our job is to filling your tummy with delicious food and with fast and free delivery
                </p>

                <div className="flex flex-wrap gap-4 items-center pt-4">
                  <Button size="lg" className="bg-white text-[#077a69] hover:bg-white/90 font-medium px-8">
                    Get Started
                  </Button>
                  <button className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full bg-[#fbcb32] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <img src='/playstore.png' alt='playstore' className='w-5 h-5 text-gray-900 fill-gray-900' />
                    </div>
                    <span className="font-medium cursor-pointer">Download on PlayStore</span>
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="reveal relative">
                <div className="relative z-10">
                 <video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-auto rounded-3xl"
>
  <source src="/Lemtight-vid.webm" type="video/webm" />
  <source src="/Lemtight-vid.mp4" type="video/mp4" />
</video>
                  
                  {/* Floating Card */}
                  <div className="absolute bottom-8 left-0 bg-white rounded-2xl shadow-xl p-4 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-orange-100">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Richard"
                          alt="Courier"
                          className="w-full h-full rounded-full"
                        />
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

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-[#fbcb32] rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-0 w-3 h-3 bg-white rounded-full animate-pulse delay-100"></div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="reveal flex flex-wrap items-center gap-6 mt-16 text-white">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                      alt={`Customer ${i}`}
                      className="w-full h-full object-cover"
                    />
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

            {/* Order Simulation */}
            <OrderSimulation />
          </div>
        </div>
      </section>

      {/* What We Serve Section */}
      <section id="why-Lemtight" className="py-20 md:py-32">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <p className="text-brand-teal font-semibold tracking-wider uppercase mb-4">WHAT WE SERVE</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
                Your Favourite Food Delivery Partner
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Feature 1 */}
              <div className="reveal text-center">
                <div className="mb-6 flex justify-center">
                  <img
                    src="/i2.svg"
                    alt="Easy to Order"
                    className="w-48 h-48"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy To Order</h3>
                <p className="text-gray-600 text-lg">
                  You only need a few steps in ordering food
                </p>
              </div>

              {/* Feature 2 */}
              <div className="reveal text-center" style={{ animationDelay: "0.1s" }}>
                <div className="mb-6 flex justify-center">
                  <img
                    src="i1.svg"
                    alt="Fastest Delivery"
                    className="w-48 h-48"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Fastest Delivery</h3>
                <p className="text-gray-600 text-lg">
                  Delivery that is always ontime even faster
                </p>
              </div>

              {/* Feature 3 */}
              <div className="reveal text-center" style={{ animationDelay: "0.2s" }}>
                <div className="mb-6 flex justify-center">
                  <img
                    src="i4.svg"
                    alt="Best Quality"
                    className="w-48 h-46"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Quality</h3>
                <p className="text-gray-600 text-lg">
                  Not only fast for us quality is also number one
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Menu Section */}
      <section id="services" className="py-20 md:py-32 bg-gray-50">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 reveal">
              <p className="text-brand-teal font-semibold tracking-wider uppercase mb-4">OUR MENU</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl leading-tight">
                Menu That Always Makes You Fall In Love
              </h2>
            </div>

            {/* Menu Categories */}
            <div className="flex flex-wrap gap-3 mb-8 reveal">
              <button className="px-6 py-3 bg-[#077a69] text-white rounded-full font-medium shadow-lg hover:bg-[#077a69]/90 transition-colors">
                 Pizza
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors">
                 Burger
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors">
                 Cupcake
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors">
                 Ramen
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors">
                 Ice Cream
              </button>
            </div>

            {/* Menu Items - Desktop Horizontal Scroll */}
            <div className="relative reveal">
              {/* Desktop Navigation Arrows */}
              <div className="hidden md:flex absolute right-0 -top-20 gap-3 z-10">
                <button
                  onClick={() => scrollMenu("left")}
                  className="w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scrollMenu("right")}
                  className="w-16 h-16 rounded-full bg-[#077a69] hover:bg-[#077a69]/90 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div
                id="menu-scroll-container"
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 md:w-96 rounded-3xl overflow-hidden shadow-xl group cursor-pointer relative h-[500px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                      <h3 className="text-3xl font-medium mb-3">{item.name}</h3>
                      <p className="text-3xl font-bold mb-4">
                        <span className="text-brand-yellow">₦</span> {item.price}
                      </p>
                      <button className="flex items-center gap-2 text-lg font-medium hover:gap-4 transition-all">
                        Order Now
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Navigation Buttons */}
              <div className="flex md:hidden justify-center gap-3 mt-6">
                <button
                  onClick={() => scrollMenu("left")}
                  className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollMenu("right")}
                  className="w-14 h-14 rounded-full bg-[#077a69] flex items-center justify-center flex-shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Chef Image */}
              <div className="reveal relative">
                <div className="rounded-[80px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80"
                    alt="Chef"
                    className="w-full h-[600px] object-cover"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="reveal space-y-6">
                <p className="text-brand-teal font-semibold tracking-wider uppercase">WHAT THEY SAY</p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  What Our Customers Say About Us
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  "Lemtight is the best. Besides the many and delicious meals, the service is also very good,
                  especially in the very fast delivery. I highly recommend Lemtight to you".
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa"
                      alt="Theresa Jordan"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-gray-900">Theresa Jordan</p>
                    <p className="text-gray-500">Food Enthusiast</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-brand-yellow fill-[#fbcb32]" />
                  ))}
                  <Star className="w-6 h-6 text-[brand-yellow] fill-[#fbcb32]" />
                  <span className="ml-2 font-medium">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-gray-50">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <p className="text-brand-teal font-semibold tracking-wider uppercase mb-4">Got Questions?</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4 reveal">
              {faqItems.map((item, index) => (
                <details key={index} className="group border border-gray-200 rounded-lg p-6 bg-white hover:border-brand-teal transition-colors cursor-pointer">
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

      {/* Download App Section */}
      <section className="py-20 md:py-32 bg-orange-50">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-orange-100/50 rounded-[30px] p-8 md:p-16 relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Content */}
                <div className="reveal space-y-6">
                  <p className="text-brand-teal font-semibold tracking-wider uppercase">DOWNLOAD APP</p>
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Get Started With Lemtight Today!
                  </h2>
                  <p className="text-lg text-gray-600">
                    Discover food wherever and whenever and get your food delivered quickly.
                  </p>
                  <Button size="lg" className="bg-[#077a69] hover:bg-[#077a69]/90 text-white px-8">
                    Get The App
                  </Button>
                </div>

                {/* App Preview */}
                <div className="reveal relative">
                  <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
                    <div className="aspect-[9/16] bg-gradient-to-b from-orange-100 to-white rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <img src='/p1.png' loading="lazy" alt='mockup' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-20 pb-8 border-t">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-24 h-12 bg-[#077a69] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <div className="text-center leading-tight">
                       <img src="./logo/logo.png" loading="lazy" alt="lemtight-logo" className="w-46" />
                    </div>
                  </div>
                  {/* <span className="text-xl font-semibold text-gray-900">Lemtight</span> */}
                </div>
                <p className="text-gray-600 mb-6 text-sm">
                  Our job is to filling your tummy with delicious food and with fast and free delivery.
                </p>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#077a69] hover:text-white transition-colors cursor-pointer text-xs">
                    f
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#077a69] hover:text-white transition-colors cursor-pointer text-xs">
                    𝕏
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#077a69] hover:text-white transition-colors cursor-pointer text-xs">
                    in
                  </div>
                </div>
              </div>

              {/* About */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">About</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">News</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Menu</li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Company</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Why Lemtight?</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Partner With Us</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">FAQ</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Blog</li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Support</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Account</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Support Center</li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Feedback</li>
                  <li 
                    onClick={() => setShowContactForm(true)}
                    className="hover:text-brand-teal cursor-pointer transition-colors"
                  >
                    Contact Us
                  </li>
                  <li className="hover:text-brand-teal cursor-pointer transition-colors">Accessibility</li>
                </ul>
              </div>

              {/* Get in Touch */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Get in Touch</h3>
                <p className="text-gray-600 mb-4 text-sm">Question or feedback?</p>
                <p className="text-gray-600 mb-4 text-sm">We'd love to hear from you</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                  <button className="w-10 h-10 bg-[#077a69] rounded-full flex items-center justify-center text-white hover:bg-[#077a69]/90 transition-colors flex-shrink-0">
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-500 text-sm pt-8 border-t">
              © {new Date().getFullYear()} Lemtight. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#077a69] text-white flex items-center justify-center shadow-lg hover:bg-[#077a69]/90 transition-colors animate-bounce-slow z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Contact Form Modal */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Get In Touch With Us</DialogTitle>
            <DialogDescription>
              Send us a message and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none h-32"
                placeholder="Your message..."
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                className="cursor-pointer hover:bg-gray-100 text-gray-900"
                variant="outline"
                onClick={() => setShowContactForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#077a69] hover:bg-[#077a69]/90 cursor-pointer text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Cookie Consent Dialog */}
      <Dialog open={showCookieDialog} onOpenChange={setShowCookieDialog}>
        <DialogContent className="sm:max-w-md bottom-4 top-auto translate-y-0 data-[state=open]:slide-in-from-bottom-full">
          <DialogHeader>
            <DialogTitle>🍪 Cookie Notice</DialogTitle>
            <DialogDescription>
              We use cookies to enhance your browsing experience and analyze our traffic. 
              By clicking "Accept", you consent to our use of cookies.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleDeclineCookies}
              className="flex-1 cursor-pointer"
            >
              Decline
            </Button>
            <Button
              onClick={handleAcceptCookies}
              className="flex-1 bg-[#077a69] hover:bg-[#077a69]/90 cursor-pointer"
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .reveal {
          opacity: 0;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 1.5s infinite;
        }
      `}</style>
      </div>
    </>
  );
}
