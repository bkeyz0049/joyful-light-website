"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SupportPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    issue_type: "",
    description: "",
  });

  const trackingId = `JL-${Date.now().toString().slice(-8)}`;

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitIssue = async () => {
    if (
      !form.full_name ||
      !form.email ||
      !form.phone ||
      !form.issue_type ||
      !form.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("general_issues").insert({
      ...form,
      tracking_id: trackingId,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Could not submit issue.");
      return;
    }

    alert(`Issue submitted successfully.\nTracking ID: ${trackingId}`);

    setForm({
      full_name: "",
      email: "",
      phone: "",
      issue_type: "",
      description: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#061d49] px-5 py-16">
      <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-[#061d49]">
          Log Other Issues
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          Submit complaints or issues and receive a unique tracking ID.
        </p>

        <div className="mt-8 grid gap-5">
          <input
            name="full_name"
            value={form.full_name}
            onChange={updateForm}
            placeholder="Full Name"
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="email"
            value={form.email}
            onChange={updateForm}
            placeholder="Email Address"
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={updateForm}
            placeholder="Phone Number"
            className="rounded-xl border px-4 py-3"
          />

          <select
            name="issue_type"
            value={form.issue_type}
            onChange={updateForm}
            className="rounded-xl border px-4 py-3"
          >
            <option value="">Select Issue Type</option>
            <option>Customer Service</option>
            <option>Website Problem</option>
            <option>Delay Complaint</option>
            <option>Technical Issue</option>
            <option>Other</option>
          </select>

          <textarea
            name="description"
            value={form.description}
            onChange={updateForm}
            placeholder="Describe your issue"
            className="min-h-32 rounded-xl border px-4 py-3"
          />

          <button
            type="button"
            onClick={submitIssue}
            disabled={loading}
            className="rounded-full bg-yellow-400 px-8 py-4 font-black text-[#061d49]"
          >
            {loading ? "Submitting..." : "Submit Issue"}
          </button>
        </div>
      </section>
    </main>
  );
}