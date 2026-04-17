"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Testimonials() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (!error) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900" style={{fontFamily: "'Georgia', serif"}}>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"} border-b border-stone-200`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold tracking-tight" style={{color: "#c2446e"}}>Aimee's Apartments</div>
            <div className="text-xs text-stone-400 tracking-widest uppercase" style={{fontFamily: "sans-serif"}}>Aimee Grodanz · Licensed Broker · NYC</div>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Home</a>
            <a href="/apply" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">How to Apply</a>
            <a href="/tips" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Tips</a>
            <a href="/listings" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Listings</a>
            <a href="/testimonials" className="text-sm font-bold transition-colors" style={{color: "#c2446e"}}>Testimonials</a>
            <a href="/contact" className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90" style={{backgroundColor: "#c2446e"}}>Contact</a>
            <a href="/admin" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">Admin</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-stone-600 text-xl p-2">☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="py-1">Home</a>
            <a href="/apply" className="py-1">How to Apply</a>
            <a href="/tips" className="py-1">Tips</a>
            <a href="/listings" className="py-1">Listings</a>
            <a href="/testimonials" className="py-1 font-bold" style={{color: "#c2446e"}}>Testimonials</a>
            <a href="/contact" className="py-1 font-bold" style={{color: "#c2446e"}}>Contact</a>
            <a href="/admin" className="py-1 text-stone-400">Admin</a>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-6">
        <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>What People Say</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4" style={{letterSpacing: "-0.5px"}}>Testimonials</h1>
        <p className="text-stone-500 text-base leading-relaxed max-w-2xl" style={{fontFamily: "sans-serif"}}>Real words from real clients. These are the people Aimee has helped find their homes across New York City.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
        {loading ? (
          <div className="text-center py-20 text-stone-400" style={{fontFamily: "sans-serif"}}>Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white rounded-xl p-10 border border-stone-100 text-center" style={{fontFamily: "sans-serif"}}>
            <p className="text-stone-400 text-sm mb-4">No testimonials yet — be the first!</p>
            <a href="/testimonial" className="text-sm font-semibold" style={{color: "#c2446e"}}>Share your experience →</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
                <div className="border-l-2 pl-5 mb-4" style={{borderColor: "#c2446e"}}>
                  <p className="text-stone-500 text-sm leading-relaxed italic" style={{fontFamily: "sans-serif"}}>"{t.quote}"</p>
                </div>
                <div style={{fontFamily: "sans-serif"}}>
                  <p className="font-bold text-stone-800 text-sm">{t.name}</p>
                  {t.neighborhood && <p className="text-stone-400 text-xs">{t.neighborhood}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl p-6 sm:p-8 border border-stone-200 text-center">
          <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Worked with Aimee?</div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">Share your experience.</h3>
          <p className="text-stone-500 text-sm mb-6 max-w-lg mx-auto" style={{fontFamily: "sans-serif"}}>Your words help other New Yorkers find the right broker.</p>
          <a href="/testimonial" className="inline-block text-white font-semibold px-7 py-3 rounded-full text-sm hover:opacity-90 transition-opacity" style={{backgroundColor: "#c2446e", fontFamily: "sans-serif"}}>Leave a Testimonial</a>
        </div>
      </div>

      <footer className="bg-white border-t border-stone-200 px-4 sm:px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}