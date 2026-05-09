"use client";

import { useState } from "react";

declare global {
  interface Window {
    MonnifySDK?: any;
  }
}

export default function PaymentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Creation",
    amount: "50000",
  });

  const payWithMonnify = () => {
    if (!window.MonnifySDK) {
      alert("Monnify SDK not loaded yet.");
      return;
    }

    window.MonnifySDK.initialize({
      amount: Number(form.amount),
      currency: "NGN",
      reference: `JL-${Date.now()}`,
      customerFullName: form.name,
      customerEmail: form.email,
      customerMobileNumber: form.phone,
      apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY,
      contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE,
      paymentDescription: `${form.service} Payment`,
      metadata: {
        service: form.service,
      },

      onComplete: function (response: any) {
        console.log(response);
        alert("Payment successful!");
      },

      onClose: function () {
        console.log("Payment window closed");
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#061d49] px-5 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
        <h1 className="text-3xl font-bold">
          Pay for a Service
        </h1>

        <p className="mt-2 text-slate-600">
          Secure payment powered by Monnify.
        </p>

        <div className="mt-8 grid gap-4">
          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            className="rounded-xl border px-4 py-3"
            value={form.service}
            onChange={(e) =>
              setForm({ ...form, service: e.target.value })
            }
          >
            <option>Website Creation</option>
            <option>Data Analysis & Dashboard Creation</option>
            <option>IT Services</option>
            <option>CAC Registration</option>
            <option>Writing Services</option>
          </select>

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <button
            onClick={payWithMonnify}
            className="rounded-full bg-yellow-400 px-6 py-4 font-bold text-[#061d49]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </main>
  );
}