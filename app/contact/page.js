"use client";

import { useState, useEffect } from "react";

export default function Contact() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900" style={{fontFamily: "'Georgia', serif"}}>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"} border-b border-stone-200`}>
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold tracking-tight" style={{color: "#c2446e"}}>Aimee's Apartments</div>
            <div className="text-xs text-stone-400 tracking-widest uppercase" style={{fontFamily: "sans-serif"}}>Aimee Grodanz · Licensed Broker · NYC</div>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Home</a>
            <a href="/apply" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">How to Apply</a>
            <a href="/tips" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Tips</a>
            <a href="/listings" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Listings</a>
            <a href="/contact" className="text-sm font-bold transition-colors" style={{color: "#c2446e"}}>Contact</a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-14 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Get in Touch</div>
            <h1 className="text-4xl font-bold text-stone-900 mb-5" style={{letterSpacing: "-0.5px"}}>
              Let&apos;s find you<br/>something wonderful.
            </h1>
            <p className="text-stone-500 text-base leading-relaxed mb-8" style={{fontFamily: "sans-serif"}}>
              The best way to reach me is always a phone call. I pick up on the first ring — no voicemail, no assistant, just me. Whether you&apos;re just starting to think about moving or need to sign a lease tomorrow, I&apos;m here.
            </p>

            <div className="space-y-6" style={{fontFamily: "sans-serif"}}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-sm" style={{backgroundColor: "#c2446e"}}>📞</div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-1">Phone / Text</p>
                  <a href="tel:+16462419797" className="text-xl font-bold hover:opacity-70 transition-opacity" style={{color: "#c2446e"}}>(646) 241-9797</a>
                  <p className="text-stone-400 text-xs mt-1">Call or text anytime — I always pick up.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-sm" style={{backgroundColor: "#c2446e"}}>👩‍💼</div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-1">Credentials</p>
                  <p className="font-bold text-stone-800">Aimee Grodanz, LREB</p>
                  <p className="text-stone-400 text-sm">Licensed Real Estate Broker</p>
                  <p className="text-stone-400 text-sm">New York City · 20+ Years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4" style={{fontFamily: "sans-serif"}}>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{color: "#c2446e"}}>Good Reasons to Reach Out</div>
            {[
              "You're not sure which neighborhood is right for you",
              "You want to know what your budget can realistically get in NYC",
              "You found a listing and want my honest opinion",
              "You need help putting together your application",
              "You have questions about a lease before you sign",
              "You manage a building and need a reliable broker partner",
              "You just want to explore what's out there — no pressure",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-stone-100 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{backgroundColor: "#c2446e"}} />
                <p className="text-stone-600 text-sm">{item}</p>
              </div>
            ))}

            <div className="bg-white rounded-xl p-6 border border-stone-200 mt-6">
              <p className="text-stone-500 text-sm leading-relaxed italic mb-3">
                &quot;I charge low fees with top notch service. Please let me see or rent you your new home and make your dreams come true.&quot;
              </p>
              <p className="font-bold text-sm" style={{color: "#c2446e"}}>— Aimee Grodanz, LREB</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-stone-200 px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}