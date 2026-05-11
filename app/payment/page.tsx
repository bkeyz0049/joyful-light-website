"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const paymentOptions = [
  "Bank Transfer",
  "Card Payment",
  "USSD",
  "POS",
  "Mobile Banking App",
  "Internet Banking",
  "Other",
];

export default function PaymentIssuePage() {
  const [loading, setLoading] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    customer_name: "",
    means_of_payment: "",
    bank_name: "",
    account_number: "",
    phone: "",
    description: "",
  });

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpg",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, JPEG, and PNG files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File must not be more than 5MB.");
      e.target.value = "";
      return;
    }

    setReceiptFile(file);
  };

  const submitIssue = async () => {
    if (
      !form.customer_name ||
      !form.means_of_payment ||
      !form.bank_name ||
      !form.account_number ||
      !form.phone ||
      !form.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\d{10,11}$/.test(form.account_number)) {
      alert("Please enter a valid account number.");
      return;
    }

    if (!/^\d{11}$/.test(form.phone)) {
      alert("Phone number must be exactly 11 digits.");
      return;
    }

    if (!receiptFile) {
      alert("Please upload payment receipt or screenshot.");
      return;
    }

    setLoading(true);

    const fileExt = receiptFile.name.split(".").pop();
    const fileName = `payment-issue-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("payment-issues")
      .upload(fileName, receiptFile);

    if (uploadError) {
      setLoading(false);
      console.error(uploadError);
      alert("Could not upload receipt. Please try again.");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("payment-issues")
      .getPublicUrl(fileName);

    const { error } = await supabase.from("payment_issues").insert({
      ...form,
      receipt_url: publicUrlData.publicUrl,
      status: "pending_review",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Could not submit payment issue.");
      return;
    }

    alert("Your payment issue has been submitted successfully.");

    setForm({
      customer_name: "",
      means_of_payment: "",
      bank_name: "",
      account_number: "",
      phone: "",
      description: "",
    });

    setReceiptFile(null);
  };

  return (
    <main className="min-h-screen bg-[#061d49] px-5 py-16 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-[#061d49]">
          Payment Issues
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          Lodge a complaint if you experienced payment issues. Please provide
          accurate payment details and upload a receipt or screenshot.
        </p>

        <div className="mt-8 grid gap-5">
          <input
            name="customer_name"
            value={form.customer_name}
            onChange={updateForm}
            placeholder="Full Name of Customer as on Account"
            className="rounded-xl border px-4 py-3 outline-none focus:border-[#0b63f6]"
          />

          <select
            name="means_of_payment"
            value={form.means_of_payment}
            onChange={updateForm}
            className="rounded-xl border px-4 py-3 outline-none focus:border-[#0b63f6]"
          >
            <option value="">Select Means of Payment</option>
            {paymentOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <input
            name="bank_name"
            value={form.bank_name}
            onChange={updateForm}
            placeholder="Bank Name"
            className="rounded-xl border px-4 py-3 outline-none focus:border-[#0b63f6]"
          />

          <input
            name="account_number"
            value={form.account_number}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 11) {
                setForm({ ...form, account_number: value });
              }
            }}
            placeholder="Account Number of Account Debited"
            className="rounded-xl border px-4 py-3 outline-none focus:border-[#0b63f6]"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 11) {
                setForm({ ...form, phone: value });
              }
            }}
            placeholder="Phone Number"
            className="rounded-xl border px-4 py-3 outline-none focus:border-[#0b63f6]"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={updateForm}
            placeholder="Describe the payment issue"
            className="min-h-32 rounded-xl border px-4 py-3 outline-none focus:border-[#0b63f6]"
          />

          <div className="rounded-xl border border-dashed p-5">
            <label className="font-bold text-[#061d49]">
              Upload Receipt/Screenshot
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFile}
              className="mt-3 block w-full"
            />

            <p className="mt-2 text-sm text-slate-500">
              Accepted files: PDF, JPG, JPEG, PNG. Maximum file size: 5MB.
            </p>

            {receiptFile && (
              <p className="mt-2 text-sm font-bold text-green-600">
                Selected: {receiptFile.name}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={submitIssue}
            disabled={loading}
            className="rounded-full bg-yellow-400 px-8 py-4 font-black text-[#061d49] transition hover:bg-yellow-300 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Payment Issue"}
          </button>
        </div>
      </section>
    </main>
  );
}