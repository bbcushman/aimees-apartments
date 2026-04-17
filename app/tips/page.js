"use client";

import { useState, useEffect } from "react";

export default function Tips() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tips = [
    {
      emoji: "📋",
      title: "Start With a Clear Plan",
      body: "Before you start looking, get honest with yourself about your budget. A good rule of thumb is no more than 30% of your take-home pay on rent. Make a list of your must-haves versus nice-to-haves, and please — map out your commute before you fall in love with a place. I can't tell you how many people overlook this one.",
    },
    {
      emoji: "⚡",
      title: "Move Fast — But Not Blindly",
      body: "In NYC, good apartments move in hours. When you find something you love, be ready to apply immediately. Have your documents organized and ready to send at a moment's notice. But fast doesn't mean careless — always read what you're signing.",
    },
    {
      emoji: "☀️",
      title: "Tour Smart",
      body: "Visit during the day to see the natural light. Check water pressure, cell service, and look for safety exits. Walk the neighborhood at different times — a quiet Tuesday morning can feel very different on a Friday night. Read building reviews before you commit.",
    },
    {
      emoji: "📄",
      title: "Read Your Lease Carefully",
      body: "I know it's long, but please read every word. Look for renewal terms, subletting rules, pet policies, and early termination fees. If something doesn't match what you were told verbally, ask for it in writing. Always get everything in writing.",
    },
    {
      emoji: "📸",
      title: "Document Everything at Move-In",
      body: "The day you get your keys, walk through every room with your phone and photograph every scratch, scuff, and imperfection. Send them to your landlord in writing that same day. This protects your security deposit when it's time to move out. I've seen so many people lose money on this.",
    },
    {
      emoji: "🏘️",
      title: "Think Beyond the Apartment",
      body: "The apartment is just part of the equation. Think about what surrounds it — grocery stores, transit, noise, green space. A great apartment in the wrong neighborhood can make you miserable. I always tell my clients: fall in love with the block, not just the unit.",
    },
    {
      emoji: "💬",
      title: "Communicate Openly",
      body: "Whether it's with me, your landlord, or your building manager — honest, clear communication makes everything smoother. If something is wrong, say so in writing. The clients who have the easiest experiences are always the ones who communicate clearly and document everything.",
    },
    {
      emoji: "📞",
      title: "When in Doubt, Just Call Me",
      body: "Seriously — I pick up on the first ring. There is no question too small. Whether you're just starting to think about moving or need to sign a lease tomorrow, I'm here. That's what Aimee's Apartments is all about.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900" style={{fontFamily: "'Georgia', serif"}}>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"} border-b border-stone-200`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div>
            <a href="/" className="text-lg font-bold tracking-tight" style={{color: "#c2446e"}}>Aimee's Apartments</a>
            <div className="text-xs text-stone-400 tracking-widest uppercase" style={{fontFamily: "sans-serif"}}>Aimee Grodanz · Licensed Broker · NYC</div>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Home</a>
            <a href="/apply" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">How to Apply</a>
            <a href="/tips" className="text-sm font-bold transition-colors" style={{color: "#c2446e"}}>Tips</a>
            <a href="/listings" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Listings</a>
            <a href="/testimonials" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Testimonials</a>
            <a href="/contact" className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90" style={{backgroundColor: "#c2446e"}}>Contact</a>
            <a href="/admin" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">Admin</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-stone-600 text-xl p-2">☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="py-1">Home</a>
            <a href="/apply" className="py-1">How to Apply</a>
            <a href="/tips" className="py-1 font-bold" style={{color: "#c2446e"}}>Tips</a>
            <a href="/listings" className="py-1">Listings</a>
            <a href="/testimonials" className="py-1">Testimonials</a>
            <a href="/contact" className="py-1 font-bold" style={{color: "#c2446e"}}>Contact</a>
            <a href="/admin" className="py-1 text-stone-400">Admin</a>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-6">
        <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>From Aimee</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4" style={{letterSpacing: "-0.5px"}}>Helpful Tips for Apartment Hunters</h1>
        <p className="text-stone-500 text-base leading-relaxed max-w-2xl" style={{fontFamily: "sans-serif"}}>
          After 20 years of helping people find their homes, I&apos;ve learned a thing or two. Here&apos;s my honest, no-fluff advice — written the way I&apos;d tell it to a friend.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-stone-50 transition-colors min-h-[56px]"
              >
                <span className="text-2xl shrink-0">{tip.emoji}</span>
                <span className="font-bold text-stone-800 text-sm flex-1" style={{fontFamily: "sans-serif"}}>{tip.title}</span>
                <span className="text-stone-400 text-sm shrink-0 ml-2" style={{fontFamily: "sans-serif"}}>{open === i ? "▲" : "▼"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-0 border-t border-stone-100">
                  <p className="text-stone-500 text-sm leading-relaxed pt-4" style={{fontFamily: "sans-serif"}}>{tip.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl p-6 sm:p-8 border border-stone-200 text-center">
          <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Ready to Start?</div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">I&apos;d love to help you find your next home.</h3>
          <p className="text-stone-500 text-sm mb-6 max-w-lg mx-auto" style={{fontFamily: "sans-serif"}}>The best way to reach me is a phone call. I always pick up.</p>
          <a href="tel:+16462419797" className="inline-block text-sm font-semibold py-3 px-6 rounded-full" style={{color: "#c2446e", fontFamily: "sans-serif"}}>
            📞 (646) 241-9797
          </a>
        </div>
      </div>

      <footer className="bg-white border-t border-stone-200 px-4 sm:px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}