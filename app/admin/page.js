"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTestimonials() {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchTestimonials(); }, []);

  async function approve(id) {
    await supabase.from("testimonials").update({ approved: true }).eq("id", id);
    fetchTestimonials();
  }

  async function remove(id) {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  }

  if (loading) return <p className="text-stone-400 text-sm">Loading...</p>;
  if (testimonials.length === 0) return <p className="text-stone-400 text-sm">No testimonials yet.</p>;

  return (
    <div className="space-y-3">
      {testimonials.map(t => (
        <div key={t.id} className="bg-white rounded-xl border border-stone-100 p-4 flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.approved ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                {t.approved ? "Published" : "Pending"}
              </span>
              <p className="font-bold text-stone-800 text-sm">{t.name}</p>
              {t.neighborhood && <p className="text-stone-400 text-xs">{t.neighborhood}</p>}
            </div>
            <p className="text-stone-500 text-sm italic">"{t.quote}"</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {!t.approved && (
              <button onClick={() => approve(t.id)} className="text-xs border border-green-200 text-green-600 px-3 py-1.5 rounded-full hover:bg-green-50">Approve</button>
            )}
            <button onClick={() => remove(t.id)} className="text-xs border border-red-100 text-red-400 px-3 py-1.5 rounded-full hover:bg-red-50">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [tab, setTab] = useState("listings");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    address: "", neighborhood: "", rent: "", beds: "", baths: "",
    availability_date: "", pet_policy: "", laundry: "",
    description: "", photo_url: "", contact_note: "", status: "Active"
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  function handleLogin() {
    if (password === "FlatironAimee10") {
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

  async function fetchSubscribers() {
    const { data } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
    setSubscribers(data || []);
  }

  useEffect(() => {
    if (authed) {
      fetchListings();
      fetchSubscribers();
    }
  }, [authed]);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function uploadPhoto() {
    if (!photoFile) return null;
    const ext = photoFile.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("listings-photos").upload(fileName, photoFile);
    if (error) return null;
    const { data } = supabase.storage.from("listings-photos").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSubmit() {
    setSaving(true);
    setSuccess("");
    let photoUrl = form.photo_url;
    if (photoFile) {
      const uploaded = await uploadPhoto();
      if (uploaded) photoUrl = uploaded;
    }
    const { error } = await supabase.from("listings").insert([{
      ...form,
      photo_url: photoUrl,
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
      setPhotoFile(null);
      setPhotoPreview(null);
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

  async function deleteSubscriber(id) {
    if (!confirm("Remove this subscriber?")) return;
    await supabase.from("subscribers").delete().eq("id", id);
    fetchSubscribers();
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Phone", "Signed Up"];
    const rows = subscribers.map(s => [s.name, s.email, s.phone, new Date(s.created_at).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
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
        <button onClick={handleLogin} className="w-full text-white font-semibold py-3 rounded-lg transition-colors" style={{backgroundColor: "#c2446e"}}>Enter</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50" style={{fontFamily: "sans-serif"}}>
      <div className="bg-white border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between">
  <a href="/" className="font-bold" style={{color: "#c2446e"}}>Aimee's Apartments — Admin</a>
  <div className="flex items-center gap-4" style={{fontFamily: "sans-serif"}}>
    <a href="/listings" className="text-sm text-stone-400 hover:text-stone-600">Listings</a>
    <a href="/testimonials" className="text-sm text-stone-400 hover:text-stone-600">Testimonials</a>
    <a href="/subscribe" className="text-sm text-stone-400 hover:text-stone-600">Subscribe page</a>
  </div>
</div>

      <div className="max-w-5xl mx-auto px-8 pt-8">
        <div className="flex gap-2 mb-8 flex-wrap">
          {["listings", "subscribers", "testimonials"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === t ? "text-white" : "bg-white border border-stone-200 text-stone-500 hover:bg-stone-50"}`}
              style={tab === t ? {backgroundColor: "#c2446e"} : {}}
            >
              {t === "listings" ? "Listings" : t === "subscribers" ? `Subscribers (${subscribers.length})` : "Testimonials"}
            </button>
          ))}
        </div>

        {tab === "listings" && (
          <>
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
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2">Photo</label>
                <div className="flex items-start gap-4">
                  <label className="cursor-pointer bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl px-6 py-4 text-sm text-stone-400 hover:border-stone-400 transition-colors text-center">
                    <div className="text-2xl mb-1">📷</div>
                    <div>Click to upload photo</div>
                    <div className="text-xs mt-1">JPG, PNG up to 50MB</div>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                  {photoPreview && (
                    <div className="relative">
                      <img src={photoPreview} alt="preview" className="w-32 h-24 object-cover rounded-xl border border-stone-200" />
                      <button onClick={() => { setPhotoFile(null); setPhotoPreview(null); }} className="absolute -top-2 -right-2 bg-white border border-stone-200 rounded-full w-6 h-6 text-xs text-stone-400 hover:text-red-400">✕</button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-stone-400 mt-2">Or paste a URL instead:</p>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.photo_url}
                  onChange={e => setForm({...form, photo_url: e.target.value})}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-400 mt-1"
                />
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
                        <button onClick={() => updateStatus(listing.id, "Rented")} className="text-xs border border-stone-200 text-stone-500 px-3 py-1.5 rounded-full hover:bg-stone-50">Mark Rented</button>
                      ) : (
                        <button onClick={() => updateStatus(listing.id, "Active")} className="text-xs border border-stone-200 text-stone-500 px-3 py-1.5 rounded-full hover:bg-stone-50">Mark Active</button>
                      )}
                      <button onClick={() => deleteListing(listing.id)} className="text-xs border border-red-100 text-red-400 px-3 py-1.5 rounded-full hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "subscribers" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-stone-900 text-lg">{subscribers.length} Subscribers</h2>
              <button onClick={exportCSV} className="text-sm font-semibold border border-stone-200 px-5 py-2 rounded-full hover:bg-stone-50 text-stone-600">Export CSV</button>
            </div>
            {subscribers.length === 0 ? (
              <p className="text-stone-400 text-sm">No subscribers yet.</p>
            ) : (
              <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-widest">Name</th>
                      <th className="px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-widest">Email</th>
                      <th className="px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-widest">Phone</th>
                      <th className="px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-widest">Signed Up</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(s => (
                      <tr key={s.id} className="border-b border-stone-50 hover:bg-stone-50">
                        <td className="px-4 py-3 font-medium text-stone-800">{s.name}</td>
                        <td className="px-4 py-3 text-stone-500">{s.email}</td>
                        <td className="px-4 py-3 text-stone-500">{s.phone}</td>
                        <td className="px-4 py-3 text-stone-400 text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteSubscriber(s.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {tab === "testimonials" && <TestimonialsTab />}

      </div>
    </div>
  );
}