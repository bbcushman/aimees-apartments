"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Previous() {
  const [scrolled, setScrolled] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "Rented")
        .order("created_at", { ascending: false });
      if (!error) setListings(data);
      setLoading(false);
    }
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900" style={{fontFamily: "'Georgia', serif"}}>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"} border-b border-stone-200`}>
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
          <div>
            <a href="/" className="text-lg font-bold tracking-tight" style={{color: "#c2446e"}}>Aimee's Apartments</a>
            <div className="text-xs text-stone-400 tracking-widest uppercase" style={{fontFamily: "sans-serif"}}>Aimee Grodanz · Licensed Broker · NYC</div>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Home</a>
            <a href="/apply" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">How to Apply</a>
            <a href="/tips" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Tips</a>
            <a href="/listings" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Listings</a>
            <a href="/testimonials" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Testimonials</a>
            <a href="/previous" className="text-sm font-bold transition-colors" style={{color: "#c2446e"}}>Previously Placed</a>
            <a href="/contact" className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90" style={{backgroundColor: "#c2446e"}}>Contact</a>
            <a href="/admin" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">Admin</a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-14 pb-6">
        <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Track Record</div>
        <h1 className="text-4xl font-bold text-stone-900 mb-4" style={{letterSpacing: "-0.5px"}}>Previously Placed</h1>
        <p className="text-stone-500 text-base leading-relaxed max-w-2xl" style={{fontFamily: "sans-serif"}}>
          Homes found and families settled. Every one of these apartments was placed by Aimee — a small window into 20+ years of work across New York City.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 pb-16">
        {loading ? (
          <div className="text-center py-20 text-stone-400" style={{fontFamily: "sans-serif"}}>Loading...</div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-xl p-10 border border-stone-100 text-center" style={{fontFamily: "sans-serif"}}>
            <p className="text-stone-400 text-sm">No previous listings yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
                {listing.photo_url && (
                  <div className="relative">
                    <img src={listing.photo_url} alt={listing.address} className="w-full h-40 object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs bg-stone-800 text-white px-2 py-1 rounded-full font-semibold opacity-80">Rented</span>
                    </div>
                  </div>
                )}
                <div className="p-4" style={{fontFamily: "sans-serif"}}>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">{listing.address}</h3>
                  <p className="text-stone-400 text-xs mb-2">{listing.neighborhood}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-stone-50 text-stone-500 px-2 py-1 rounded-full">{listing.beds} bed</span>
                    <span className="text-xs bg-stone-50 text-stone-500 px-2 py-1 rounded-full">{listing.baths} bath</span>
                    <span className="text-xs font-semibold" style={{color: "#c2446e"}}>${listing.rent?.toLocaleString()}/mo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl p-8 border border-stone-200 text-center">
          <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Looking for your next home?</div>
          <h3 className="text-xl font-bold text-stone-900 mb-3">Let Aimee find it for you.</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-5" style={{fontFamily: "sans-serif"}}>
            <a href="/listings" className="text-white font-semibold px-7 py-3 rounded-full text-sm hover:opacity-90 transition-opacity" style={{backgroundColor: "#c2446e"}}>
              See Current Listings
            </a>
            <a href="tel:+16462419797" className="font-semibold px-7 py-3 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors">
              (646) 241-9797
            </a>
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