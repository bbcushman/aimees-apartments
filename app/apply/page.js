"use client";

import { useState, useEffect } from "react";

export default function Apply() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
            <a href="/apply" className="text-sm font-bold transition-colors" style={{color: "#c2446e"}}>How to Apply</a>
            <a href="/tips" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Tips</a>
            <a href="/listings" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Listings</a>
            <a href="/contact" className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90" style={{backgroundColor: "#c2446e"}}>Contact</a>
            <a href="/admin" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">Admin</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-stone-600 text-xl p-2">☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600" style={{fontFamily: "sans-serif"}}>
            <a href="/" className="py-1">Home</a>
            <a href="/apply" className="py-1 font-bold" style={{color: "#c2446e"}}>How to Apply</a>
            <a href="/tips" className="py-1">Tips</a>
            <a href="/listings" className="py-1">Listings</a>
            <a href="/contact" className="py-1 font-bold" style={{color: "#c2446e"}}>Contact</a>
            <a href="/admin" className="py-1 text-stone-400">Admin</a>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-6">
        <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Getting Started</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4" style={{letterSpacing: "-0.5px"}}>What You Need to Apply</h1>
        <p className="text-stone-500 text-base leading-relaxed max-w-2xl" style={{fontFamily: "sans-serif"}}>
          New York City landlords are thorough — and for good reason. The more prepared you are when the right apartment comes along, the faster we can move. Here&apos;s exactly what to have ready. Don&apos;t worry if you&apos;re missing something — just call me and we&apos;ll figure it out together.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Required */}
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Always Required</div>
            <div className="space-y-3">
              {[
                { emoji: "🪪", title: "Government-Issued Photo ID", desc: "A valid driver's license, passport, or state ID. The first thing every landlord asks for." },
                { emoji: "💼", title: "Proof of Employment", desc: "An offer letter or employment verification letter on company letterhead. Self-employed? We'll work with what you have." },
                { emoji: "💰", title: "Recent Pay Stubs", desc: "Last 2–3 pay stubs. Landlords typically want to see income of at least 40x the monthly rent." },
                { emoji: "🏦", title: "Bank Statements", desc: "Last 2–3 months showing you can cover first month, last month, and security deposit." },
                { emoji: "📊", title: "Credit Report", desc: "Most landlords run their own check. A score of 700+ puts you in great shape. Know your number ahead of time." },
                { emoji: "📝", title: "Completed Application", desc: "I'll send you exactly what's needed for each specific building — every landlord is a little different." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm flex gap-4" style={{fontFamily: "sans-serif"}}>
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h4 className="font-bold text-stone-800 text-sm">{item.title}</h4>
                      <span className="text-xs bg-rose-50 px-2 py-0.5 rounded-full font-semibold" style={{color: "#c2446e"}}>Required</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sometimes needed + fees */}
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4 mt-6 md:mt-0" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Sometimes Needed</div>
            <div className="space-y-3 mb-8">
              {[
                { emoji: "📬", title: "Reference Letters", desc: "From a previous landlord confirming you paid on time and took good care of the place. Employer or personal references also help." },
                { emoji: "🤝", title: "Guarantor / Co-Signer", desc: "If your income doesn't quite hit 40x the rent, a co-signer — often a parent or family member — is completely common in NYC." },
                { emoji: "💳", title: "Application Fee", desc: "Usually $20–$75 per person to cover the background and credit check. Paid directly to the landlord or management company." },
                { emoji: "💵", title: "First Month + Deposit", desc: "Be ready to hand over first month's rent and a security deposit (usually one month) when you sign. Sometimes last month too." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm flex gap-4" style={{fontFamily: "sans-serif"}}>
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h4 className="font-bold text-stone-800 text-sm">{item.title}</h4>
                      <span className="text-xs bg-stone-100 text-stone-400 px-2 py-0.5 rounded-full font-semibold">Sometimes</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aimee note */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>A Note from Aimee</div>
              <p className="text-stone-500 text-sm leading-relaxed italic mb-4" style={{fontFamily: "sans-serif"}}>
                &quot;Don&apos;t stress if you don&apos;t have everything perfectly organized. Call me and I&apos;ll walk you through exactly what you need for the specific apartment you&apos;re applying for. That&apos;s what I&apos;m here for.&quot;
              </p>
              <a href="tel:+16462419797" className="text-sm font-semibold" style={{color: "#c2446e", fontFamily: "sans-serif"}}>
                📞 (646) 241-9797
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-stone-200 px-4 sm:px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}