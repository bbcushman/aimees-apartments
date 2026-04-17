"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Subscribe() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit() {
    if (!form.name || (!form.email && !form.phone)) {
      setError("Please enter your name and at least an email or phone number.");
      return;
    }
    setSaving(true);
    setError("");
    const { error } = await supabase.from("subscribers").insert([form]);
    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
    setSaving(false);
  }

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
            <a href="/testimonials" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Testimonials</a>
            <a href="/contact" className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all hover:opacity-90" style={{backgroundColor: "#c2446e"}}>Contact</a>
            <a href="/admin" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">Admin</a>
          </div>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-8 pt-20 pb-16">
        {success ? (
          <div className="text-center">
            <div className="text-5xl mb-6">🏡</div>
            <h1 className="text-3xl font-bold text-stone-900 mb-4">You're on the list!</h1>
            <p className="text-stone-500 text-base leading-relaxed mb-8" style={{fontFamily: "sans-serif"}}>
              Aimee will be in touch as soon as something comes up that fits what you're looking for. Keep your phone nearby.
            </p>
            <a href="/" className="text-sm font-semibold" style={{color: "#c2446e", fontFamily: "sans-serif"}}>← Back to home</a>
          </div>
        ) : (
          <>
            <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color: "#c2446e", fontFamily: "sans-serif"}}>Stay in the loop</div>
            <h1 className="text-4xl font-bold text-stone-900 mb-4" style={{letterSpacing: "-0.5px"}}>Get notified when new apartments come in.</h1>
            <p className="text-stone-500 text-base leading-relaxed mb-10" style={{fontFamily: "sans-serif"}}>
              Aimee gets apartments before they hit the market. Leave your info and she'll reach out directly when something comes up that fits your needs.
            </p>

            <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4" style={{fontFamily: "sans-serif"}}>
              {[
                { label: "Your Name", key: "name", placeholder: "Jane Smith", type: "text" },
                { label: "Email Address", key: "email", placeholder: "jane@email.com", type: "email" },
                { label: "Phone Number", key: "phone", placeholder: "(212) 555-0100", type: "tel" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({...form, [field.key]: e.target.value})}
                    className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-stone-400"
                  />
                </div>
              ))}
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full text-white font-semibold py-3 rounded-full text-sm transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
                style={{backgroundColor: "#c2446e"}}
              >
                {saving ? "Signing up..." : "Notify Me"}
              </button>
              <p className="text-stone-400 text-xs text-center">No spam. Aimee will only reach out when she has something for you.</p>
            </div>
          </>
        )}
      </div>

      <footer className="bg-white border-t border-stone-200 px-8 py-6 text-center" style={{fontFamily: "sans-serif"}}>
        <p className="font-semibold text-stone-600 text-sm mb-1">Aimee Grodanz, LREB · Licensed Real Estate Broker · New York City</p>
        <p className="text-stone-400 text-xs">📞 <a href="tel:+16462419797" className="hover:underline" style={{color: "#c2446e"}}>(646) 241-9797</a></p>
      </footer>
    </div>
  );
}