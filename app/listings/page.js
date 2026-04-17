"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Listings() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        .order("created_at", { ascending: false });
      if (!error) setListings(data);
      setLoading(false);
    }
    fetchListings();
  }, []);

  const active = listings.filter(l => l.status === "Active");
  const rented = listings.filter(l => l.status === "Rented");

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
            <a href="/tips" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Tips</a>
            <a href="/listings" className="text-sm font-bold transition-colors" style={{color: "#c2446e"}}>Listings</a>
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
            <a href="/tips" className="py-1">Tips</a>
            <a href="/listings" className="py-1 font-bold" style={{color: "#c2446e"}}>Listings</a>
            <a href="/testimonials" className="py-1">Testimonials</a>
            <a href="/contact" className="py-1 font-bold" style={{color: "#c2446e"}}>Contact</a>
            <a href="/admin" className="py-1 text-stone-400">Admin</a>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-6">
        <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Available Now</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4" style={{letterSpacing: "-0.5px"}}>Current Listings</h1>
        <p className="text-stone-500 text-base leading-relaxed max-w-2xl" style={{fontFamily: "sans-serif"}}>
          These apartments are available now. Call me directly to schedule a showing — good places go fast.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
        {loading ? (
          <div className="text-center py-20 text-stone-400" style={{fontFamily: "sans-serif"}}>Loading listings...</div>
        ) : active.length === 0 ? (
          <div className="bg-white rounded-xl p-10 border border-stone-100 text-center" style={{fontFamily: "sans-serif"}}>
            <p className="text-stone-500 text-sm mb-3">No listings available right now — but new apartments come in all the time.</p>
            <a href="/contact" className="text-sm font-semibold" style={{color: "#c2446e"}}>Get in touch to hear what's coming up →</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {active.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
                {listing.photo_url && (
                  <img src={listing.photo_url} alt={listing.address} className="w-full h-48 object-cover" />
                )}
                <div className="p-5" style={{fontFamily: "sans-serif"}}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-stone-900 text-base">{listing.address}</h3>
                      <p className="text-stone-400 text-sm">{listing.neighborhood}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg" style={{color: "#c2446e"}}>${listing.rent?.toLocaleString()}/mo</div>
                      <div className="text-stone-400 text-xs">{listing.beds} bed · {listing.baths} bath</div>
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">{listing.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.availability_date && <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full">Available {listing.availability_date}</span>}
                    {listing.pet_policy && <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full">{listing.pet_policy}</span>}
                    {listing.laundry && <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full">{listing.laundry}</span>}
                  </div>
                  <a href="tel:+16462419797" className="inline-block text-sm font-semibold" style={{color: "#c2446e"}}>📞 Call Aimee to schedule a showing</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {rented.length > 0 && (
          <div className="mt-16">
            <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Previously Placed</div>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Homes Found</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {rented.map(listing => (
                <div key={listing.id} className="bg-white rounded-xl border border-stone-100 p-4 opacity-75" style={{fontFamily: "sans-serif"}}>
                  {listing.photo_url && (
                    <img src={listing.photo_url} alt={listing.address} className="w-full h-32 object-cover rounded-lg mb-3" />
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-stone-100 text-stone-400 px-2 py-0.5 rounded-full font-semibold">Rented</span>
                  </div>
                  <h4 className="font-bold text-stone-700 text-sm">{listing.address}</h4>
                  <p className="text-stone-400 text-xs">{listing.neighborhood} · {listing.beds} bed · ${listing.rent?.toLocaleString()}/mo</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-stone-200 px-4 sm:px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}