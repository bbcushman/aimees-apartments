"use client";

import { useState, useEffect } from "react";

export default function RealEstate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900" style={{fontFamily: "'Georgia', serif"}}>

      {/* Nav */}
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
            <a href="/listings" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Listings</a>
            <a href="/testimonials" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Testimonials</a>
            <a href="/contact" className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90" style={{backgroundColor: "#c2446e", fontFamily: "sans-serif"}}>Contact</a>
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
            <a href="/testimonials" className="py-1">Testimonials</a>
            <a href="/contact" className="py-1 font-bold" style={{color: "#c2446e"}}>Contact</a>
            <a href="/admin" className="py-1 text-stone-400">Admin</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-10 grid md:grid-cols-5 gap-8 md:gap-12 items-center">
        {/* Left — 3 cols */}
        <div className="md:col-span-3">
          <div className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{color: "#c2446e", fontFamily: "sans-serif"}}>New York City Real Estate · Est. 20+ Years</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-5" style={{letterSpacing: "-1px"}}>
            A broker who<br/>
            <span style={{color: "#c2446e"}}>knows your name.</span>
          </h1>
          <p className="text-stone-500 text-base leading-relaxed mb-4" style={{fontFamily: "sans-serif"}}>
            Hi, I&apos;m Aimee. I&apos;ve spent over 20 years building relationships across New York City — with renters, with buildings, and with the neighborhoods I love. My practice is built almost entirely on referrals, because the people I work with trust me enough to send their friends and family my way. That means everything to me.
          </p>
          <p className="text-stone-400 text-sm italic mb-8 border-l-2 pl-4" style={{borderColor: "#c2446e", fontFamily: "sans-serif"}}>
            &quot;Please let me help you find your new home and make your dreams come true.&quot;
          </p>
          <div className="flex flex-wrap gap-3" style={{fontFamily: "sans-serif"}}>
            <a href="/contact" className="text-white font-semibold px-7 py-3 rounded-full text-sm transition-all hover:opacity-90" style={{backgroundColor: "#c2446e"}}>
              Get in Touch
            </a>
            <a href="tel:+16462419797" className="font-semibold px-7 py-3 rounded-full text-sm border transition-all hover:bg-stone-100 text-stone-600 border-stone-300">
              (646) 241-9797
            </a>
          </div>
        </div>

        {/* Right — 2 cols — hidden on small, shows below hero on mobile */}
        <div className="md:col-span-2 flex flex-col items-center gap-4 hidden md:flex">
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl" style={{border: "3px solid #f3d0de"}}>
            <img src="https://i.imgur.com/n0r2Lfd.jpeg" alt="Aimee Grodanz" className="w-full h-full object-cover object-top" />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full" style={{fontFamily: "sans-serif"}}>
            <div className="bg-white rounded-xl p-4 text-center border border-stone-100 shadow-sm">
              <div className="text-2xl font-bold" style={{color: "#c2446e"}}>20+</div>
              <div className="text-xs text-stone-400 uppercase tracking-widest mt-1">Years in NYC</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-stone-100 shadow-sm">
              <div className="text-2xl font-bold" style={{color: "#c2446e"}}>500+</div>
              <div className="text-xs text-stone-400 uppercase tracking-widest mt-1">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Aimee photo — mobile only, shows below hero text */}
      <div className="md:hidden mx-4 mb-8">
        <div className="w-full max-w-xs mx-auto">
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl" style={{border: "3px solid #f3d0de"}}>
            <img src="https://i.imgur.com/n0r2Lfd.jpeg" alt="Aimee Grodanz" className="w-full h-full object-cover object-top" />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full mt-3" style={{fontFamily: "sans-serif"}}>
            <div className="bg-white rounded-xl p-4 text-center border border-stone-100 shadow-sm">
              <div className="text-2xl font-bold" style={{color: "#c2446e"}}>20+</div>
              <div className="text-xs text-stone-400 uppercase tracking-widest mt-1">Years in NYC</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-stone-100 shadow-sm">
              <div className="text-2xl font-bold" style={{color: "#c2446e"}}>500+</div>
              <div className="text-xs text-stone-400 uppercase tracking-widest mt-1">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-40 sm:h-40 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80" className="w-full h-full object-cover" alt="apartment" />
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80" className="w-full h-full object-cover" alt="living room" />
          <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80" className="w-full h-full object-cover hidden sm:block" alt="NYC" />
          <img src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80" className="w-full h-full object-cover hidden sm:block" alt="Central Park" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-200 max-w-5xl mx-auto px-4 sm:px-8" />

      {/* For Renters + For Buildings */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 grid md:grid-cols-2 gap-10 md:gap-12">

        {/* Renters */}
        <div>
          <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>For Renters</div>
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Finding you a home you&apos;ll love.</h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6" style={{fontFamily: "sans-serif"}}>
            Apartment hunting in New York is stressful. I make it easier. I listen carefully to what you need, I tap into relationships that give you access to apartments before they go public, and I stay with you every step of the way — from the first showing to the signed lease.
          </p>
          <div className="space-y-3" style={{fontFamily: "sans-serif"}}>
            {[
              { title: "Off-market access", desc: "20 years of relationships means listings before they hit StreetEasy." },
              { title: "Always available", desc: "I pick up on the first call. No voicemail, no runaround." },
              { title: "Genuinely personal", desc: "I only show you places I'd be proud to recommend." },
              { title: "Low fees", desc: "Top service without the corporate price tag." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{backgroundColor: "#c2446e"}} />
                <div>
                  <span className="font-semibold text-stone-800 text-sm">{item.title} — </span>
                  <span className="text-stone-500 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <a href="/apply" className="inline-block mt-6 text-sm font-semibold underline underline-offset-4" style={{color: "#c2446e", fontFamily: "sans-serif"}}>
            See what you need to apply →
          </a>
        </div>

        {/* Divider on mobile */}
        <div className="border-t border-stone-200 md:hidden" />

        {/* Buildings */}
        <div className="md:border-l md:border-stone-200 md:pl-12">
          <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>For Buildings & Landlords</div>
          <h2 className="text-2xl font-bold text-stone-900 mb-3">A partner you can count on.</h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6" style={{fontFamily: "sans-serif"}}>
            The building managers and owners I work with have trusted me for years — many for over a decade. I send qualified tenants, I close cleanly, and I protect the relationships I&apos;ve built because my reputation depends on it. When I introduce a tenant to your building, I&apos;m putting my name behind them.
          </p>
          <div className="space-y-3" style={{fontFamily: "sans-serif"}}>
            {[
              { title: "Pre-screened applicants", desc: "Financially solid, well-referenced, right for your building." },
              { title: "Fast, clean closings", desc: "I know the paperwork. I keep deals moving efficiently." },
              { title: "Long-term relationships", desc: "I've worked with many of my building contacts for 10–15 years." },
              { title: "Full process management", desc: "Showings, documents, follow-up — I handle everything end-to-end." },
              { title: "Minimizing vacancy", desc: "I work with urgency and care to place the right tenant quickly." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{backgroundColor: "#c2446e"}} />
                <div>
                  <span className="font-semibold text-stone-800 text-sm">{item.title} — </span>
                  <span className="text-stone-500 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <a href="/contact" className="inline-block mt-6 text-sm font-semibold underline underline-offset-4" style={{color: "#c2446e", fontFamily: "sans-serif"}}>
            Get in touch →
          </a>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white border-y border-stone-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-xs tracking-widest uppercase font-semibold mb-8 text-center" style={{color: "#c2446e", fontFamily: "sans-serif"}}>What People Say</div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { quote: "Aimee found me a 1BR in the West Village before it was even listed. I was moved in within two weeks. She is truly one of a kind.", name: "Sarah M.", area: "West Village" },
              { quote: "I called three brokers. Only Aimee picked up. She showed me four apartments the next morning and I signed that afternoon.", name: "James T.", area: "Upper East Side" },
              { quote: "She genuinely cared about what I needed — not just closing a deal. That kind of warmth is really rare in this city.", name: "Priya K.", area: "Astoria" },
            ].map((t, i) => (
              <div key={i} className="border-l-2 pl-5" style={{borderColor: "#c2446e"}}>
                <p className="text-stone-500 text-sm leading-relaxed italic mb-3" style={{fontFamily: "sans-serif"}}>"{t.quote}"</p>
                <p className="font-bold text-stone-800 text-sm" style={{fontFamily: "sans-serif"}}>{t.name}</p>
                <p className="text-stone-400 text-xs" style={{fontFamily: "sans-serif"}}>{t.area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 text-center">
        <h3 className="text-2xl font-bold text-stone-900 mb-3">Ready when you are.</h3>
        <p className="text-stone-500 text-sm max-w-xl mx-auto mb-6" style={{fontFamily: "sans-serif"}}>
          Whether you&apos;re looking for your next home or need a trusted broker for your building, I&apos;d love to connect. The best way to reach me is a phone call — I always pick up.
        </p>
        <div className="flex flex-wrap justify-center gap-3" style={{fontFamily: "sans-serif"}}>
          <a href="/contact" className="text-white font-semibold px-7 py-3 rounded-full text-sm hover:opacity-90 transition-opacity" style={{backgroundColor: "#c2446e"}}>
            Contact Aimee
          </a>
          <a href="tel:+16462419797" className="font-semibold px-7 py-3 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors">
            (646) 241-9797
          </a>
          <a href="/subscribe" className="font-semibold px-7 py-3 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors">
            Get Notified
          </a>
        </div>
      </div>

      {/* Footer photo */}
      <div className="h-36 overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=80" className="w-full h-full object-cover" alt="Central Park" />
        <div className="absolute inset-0" style={{backgroundColor: "rgba(194,68,110,0.3)"}} />
      </div>

      <footer className="bg-white border-t border-stone-200 px-4 sm:px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}