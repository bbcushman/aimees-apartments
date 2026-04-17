"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    address: "", neighborhood: "", rent: "", beds: "", baths: "",
    availability_date: "", pet_policy: "", laundry: "",
    description: "", photo_url: "", contact_note: "", status: "Active"
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  function handleLogin() {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "FlatironAimee10") {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  }

  async function fetchListings() {
    setLoading(true);
    const { data } = await supabase.from("listings").select("*").order("created_at", { ascending: false });
    setListings(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (authed) fetchListings();
  }, [authed]);

  async function handleSubmit() {
    setSaving(true);
    setSuccess("");
    const { error } = await supabase.from("listings").insert([{
      ...form,
      rent: parseInt(form.rent) || null,
    }]);
    if (error) {
      setSuccess("Error saving listing: " + error.message);
    } else {
      setSuccess("Listing added successfully!");
      setForm({
        address: "", neighborhood: "", rent: "", beds: "", baths: "",
        availability_date: "", pet_policy: "", laundry: "",
        description: "", photo_url: "", contact_note: "", status: "Active"
      });
      fetchListings();
    }
    setSaving(false);
  }

  async function updateStatus(id, status) {
    await supabase.from("listings").update({ status }).eq("id", id);
    fetchListings();
  }

  async function deleteListing(id) {
    if (!confirm("Delete this listing?")) return;
    await supabase.from("listings").delete().eq("id", id);
    fetchListings();
  }

  if (!authed) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-8 w-full max-w-sm text-center" style={{fontFamily: "sans-serif"}}>
        <div className="text-lg font-bold mb-1" style={{color: "#c2446e"}}>Aimee's Apartments</div>
        <p className="text-stone-400 text-sm mb-6">Admin access only</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm mb-3 outline-none focus:border-stone-400"
        />
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full text-white font-semibold py-3 rounded-lg transition-colors"
          style={{backgroundColor: "#c2446e"}}
        >
          Enter
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50" style={{fontFamily: "sans-serif"}}>
      <div className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between">
        <div className="font-bold" style={{color: "#c2446e"}}>Aimee's Apartments — Admin</div>
        <a href="/listings" className="text-sm text-stone-400 hover:text-stone-600">View public listings →</a>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Add listing form */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 mb-10">
          <h2 className="font-bold text-stone-900 text-lg mb-6">Add New Listing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Address", key: "address", placeholder: "123 Main St, Apt 4B" },
              { label: "Neighborhood", key: "neighborhood", placeholder: "Upper West Side" },
              { label: "Rent ($/mo)", key: "rent", placeholder: "2500" },
              { label: "Beds", key: "beds", placeholder: "1" },
              { label: "Baths", key: "baths", placeholder: "1" },
              { label: "Availability Date", key: "availability_date", placeholder: "June 1" },
              { label: "Pet Policy", key: "pet_policy", placeholder: "No pets / Cats OK / Dogs OK" },
              { label: "Laundry", key: "laundry", placeholder: "In-unit / In building / None" },
              { label: "Photo URL", key: "photo_url", placeholder: "https://..." },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({...form, [field.key]: e.target.value})}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-400"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({...form, status: e.target.value})}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-400"
              >
                <option value="Active">Active</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">Description</label>
            <textarea
              placeholder="Describe the apartment..."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={3}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-400"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">Private Note (not shown publicly)</label>
            <textarea
              placeholder="Your private notes about this listing..."
              value={form.contact_note}
              onChange={e => setForm({...form, contact_note: e.target.value})}
              rows={2}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-400"
            />
          </div>
          {success && <p className="mt-3 text-sm font-semibold" style={{color: success.includes("Error") ? "red" : "#c2446e"}}>{success}</p>}
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="mt-5 text-white font-semibold px-8 py-3 rounded-full text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{backgroundColor: "#c2446e"}}
          >
            {saving ? "Saving..." : "Add Listing"}
          </button>
        </div>

        {/* Current listings table */}
        <h2 className="font-bold text-stone-900 text-lg mb-4">All Listings</h2>
        {loading ? (
          <p className="text-stone-400 text-sm">Loading...</p>
        ) : listings.length === 0 ? (
          <p className="text-stone-400 text-sm">No listings yet.</p>
        ) : (
          <div className="space-y-3">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl border border-stone-100 p-4 flex items-start gap-4">
                {listing.photo_url && (
                  <img src={listing.photo_url} alt="" className="w-20 h-16 object-cover rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${listing.status === "Active" ? "bg-green-50 text-green-600" : "bg-stone-100 text-stone-400"}`}>
                      {listing.status}
                    </span>
                    <h4 className="font-bold text-stone-800 text-sm">{listing.address}</h4>
                  </div>
                  <p className="text-stone-400 text-xs">{listing.neighborhood} · {listing.beds} bed · {listing.baths} bath · ${listing.rent?.toLocaleString()}/mo</p>
                  {listing.description && <p className="text-stone-500 text-xs mt-1 truncate">{listing.description}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  {listing.status === "Active" ? (
                    <button onClick={() => updateStatus(listing.id, "Rented")} className="text-xs border border-stone-200 text-stone-500 px-3 py-1.5 rounded-full hover:bg-stone-50">
                      Mark Rented
                    </button>
                  ) : (
                    <button onClick={() => updateStatus(listing.id, "Active")} className="text-xs border border-stone-200 text-stone-500 px-3 py-1.5 rounded-full hover:bg-stone-50">
                      Mark Active
                    </button>
                  )}
                  <button onClick={() => deleteListing(listing.id)} className="text-xs border border-red-100 text-red-400 px-3 py-1.5 rounded-full hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}