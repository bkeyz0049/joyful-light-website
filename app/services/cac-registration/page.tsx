"use client"
import { useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
type ServiceType =
  | "Business Name Registration"
  | "Limited Liability Company Registration"
  | "Incorporated Trustees / NGO"
  | "SCUML Registration";
type Trustee = {
  surname: string;
  last_name: string;
  other_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  occupation: string;
  nin: string;
  address: string;
};
const services = [
  {
    type: "Business Name Registration" as ServiceType,
    price: 35000,
    description: "Enterprise / Business Name registration.",
  },
  {
    type: "Limited Liability Company Registration" as ServiceType,
    price: 60000,
    description: "Company name registration with CAC documents.",
  },
  {
    type: "Incorporated Trustees / NGO" as ServiceType,
    price: 180000,
    description: "NGOs, mosques, foundations, associations, clubs, etc.",
  },
  {
    type: "SCUML Registration" as ServiceType,
    price: 65000,
    description: "SCUML registration for eligible businesses.",
  },
];

const limitedCompanyBenefits = [
  "Limited Liability Protection protects your personal assets from company debts.",
  "Access to grants and funding is higher for registered limited companies.",
  "Perpetual succession means the company can continue beyond the founders.",
  "Enhanced corporate credibility helps attract bigger clients and partners.",
  "Investment and scalability are easier because shares can be issued.",
  "Small companies under qualifying thresholds may enjoy Company Income Tax exemption.",
];

const businessNameWarnings = [
  "Unlimited personal liability can expose your personal assets to business debts.",
  "Restricted grant eligibility may limit access to high-value funding.",
  "Fragile business continuity means the business may end if the owner dies.",
  "Limited fundraising potential because shares cannot be issued.",
  "Lower corporate perception may affect access to big contracts.",
];
const emptyTrustee: Trustee = {
  surname: "",
  last_name: "",
  other_name: "",
  date_of_birth: "",
  gender: "",
  phone: "",
  email: "",
  occupation: "",
  nin: "",
  address: "",
};

export default function CACRegistrationPage() {
  const [serviceType, setServiceType] = useState<ServiceType>(
    "Business Name Registration"
  );
  const [loading, setLoading] = useState(false);
  const [additionalTrustees, setAdditionalTrustees] = useState(0);
  const [chairman, setChairman] = useState<Trustee>({ ...emptyTrustee });
  const [secretary, setSecretary] = useState<Trustee>({ ...emptyTrustee });
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [trusteeToRemove, setTrusteeToRemove] = useState("");
  const selectedService = useMemo(
    () => services.find((service) => service.type === serviceType),
    [serviceType]
  );

  const [form, setForm] = useState<Record<string, string>>({});

const baseAmount =
  serviceType === "Limited Liability Company Registration" &&
  form.board_resolution === "yes"
    ? 66000
    : selectedService?.price || 0;

const amount =
  serviceType === "Incorporated Trustees / NGO"
    ? baseAmount + trustees.length * 20000
    : baseAmount;

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const updateTrustee = (
  setter: React.Dispatch<React.SetStateAction<Trustee>>,
  field: keyof Trustee,
  value: string
) => {
  setter((current) => ({
    ...current,
    [field]: value,
  }));
};

const updateAdditionalTrustee = (
  index: number,
  field: keyof Trustee,
  value: string
) => {
  setTrustees((current) =>
    current.map((trustee, trusteeIndex) =>
      trusteeIndex === index ? { ...trustee, [field]: value } : trustee
    )
  );
};

const addAdditionalTrustee = () => {
  if (trustees.length >= 15) {
    alert("Maximum of 15 additional trustees allowed.");
    return;
  }

  setTrustees((current) => [...current, { ...emptyTrustee }]);
  setAdditionalTrustees((current) => Math.min(15, current + 1));
};

const removeAdditionalTrustee = () => {
  setTrustees((current) => current.slice(0, -1));
  setAdditionalTrustees((current) => Math.max(0, current - 1));
};
 const isTrusteeComplete = (trustee: Trustee) => {
  const allFilled = Object.values(trustee).every(
    (value) => value.trim() !== ""
  );

  const validPhone = /^\d{11}$/.test(trustee.phone);

  const validNin = /^\d{11}$/.test(trustee.nin);

  const validEmail =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(trustee.email);

  return allFilled && validPhone && validNin && validEmail;
};
const validateIncorporatedTrustees = () => {
  if (
    !form.name_option_1 ||
    !form.name_option_2 ||
    !form.name_option_3 ||
    !form.full_address ||
    !form.phone ||
    !form.email ||
    !form.aims_objectives
  ) {
    alert("Please complete all organization details.");
    return false;
  }

  if (!isTrusteeComplete(chairman)) {
    alert("Please complete all Chairman details.");
    return false;
  }

  if (!isTrusteeComplete(secretary)) {
    alert("Please complete all Secretary details.");
    return false;
  }

  const incompleteTrusteeIndex = trustees.findIndex(
    (trustee) => !isTrusteeComplete(trustee)
  );

  if (incompleteTrusteeIndex !== -1) {
    alert(`Please complete all details for Trustee ${incompleteTrusteeIndex + 1}.`);
    return false;
  }

  return true;
};
  const submitForm = async () => {
    if (
  serviceType === "Incorporated Trustees / NGO" &&
  !validateIncorporatedTrustees()
) {
  return;
}
    if (!form.email || !form.phone) {
      alert("Please enter email address and phone number.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("service_applications").insert({
      service_type: serviceType,
      full_name:
        `${form.surname || ""} ${form.first_name || ""} ${
          form.other_name || ""
        }`.trim() || form.director_name || form.contact_name || "Customer",
      email: form.email,
      phone: form.phone,
      amount,
      form_data: {
    form_data: {
  ...form,
  chairman:
    serviceType === "Incorporated Trustees / NGO" ? chairman : undefined,
  secretary:
    serviceType === "Incorporated Trustees / NGO" ? secretary : undefined,
  trustees:
    serviceType === "Incorporated Trustees / NGO" ? trustees : undefined,
  additional_trustees:
    serviceType === "Incorporated Trustees / NGO"
      ? trustees.length
      : undefined,
  additional_trustee_fee:
    serviceType === "Incorporated Trustees / NGO"
      ? trustees.length * 20000
      : undefined,
},
},
      payment_status: "pending_payment",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Could not submit form. Please try again.");
      return;
    }

    window.location.href = `/payment?service=${encodeURIComponent(
      serviceType
    )}&amount=${amount}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
    <section className="bg-[#061d49] px-5 py-8 text-white lg:px-5">
 <div className="mx-auto max-w-2xl text-center">
    
   <p className="mb-3 text-lg font-black uppercase tracking-[0.2em] text-yellow-300 md:text-2xl">
      JOYFUL-LIGHT SCIENTIFIC AND TECHNOLOGY LIMITED
    </p>
<div className="absolute left-6 top-6 z-50">
  <Link
    href="/"
    className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-bold text-[#061d49] shadow-lg transition hover:bg-yellow-400"
  >
    ← Back to Home
  </Link>
</div>
    <h1 className="text-2xl font-black leading-tight md:text-4xl">
      CAC & Compliance Registration Services
    </h1>
    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80"> 
      Select your preferred service, fill the required details, submit your
      application, and proceed to payment.
    </p>

    <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-red-400 bg-red-500/10 p-4">
      <p className="text-lg font-bold text-red-400">
        PLEASE NOTE:
      </p>

      <p className="mt-4 text-base leading-8 text-red-200">
        If you experience any payment issues, kindly reach out to our support
        team through our email:
      </p>

      <p className="mt-3 text-lg font-black text-yellow-300">
        Joyfulllightscifitech@gmail.com
      </p>

      <p className="mt-4 text-base leading-8 text-red-200">
        Please include your payment receipt or any evidence of the payment
        issue when contacting support.
      </p>

      <p className="mt-5 text-lg font-black text-red-500">
        Payments are strictly NON-REFUNDABLE.
      </p>
    </div>

  </div>
</section> 

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
          {services.map((service) => (
            <button
              key={service.type}
              onClick={() => {
                 setServiceType(service.type);
                    setForm({});
                        setAdditionalTrustees(0);
                }}
              className={`rounded-3xl border p-6 text-left shadow-sm transition ${
                serviceType === service.type
                  ? "border-[#061d49] bg-[#061d49] text-white"
                  : "border-slate-200 bg-white text-slate-900 hover:border-[#061d49]"
              }`}
            >
              <h3 className="font-black">{service.type}</h3>
              <p
                className={`mt-3 text-sm ${
                  serviceType === service.type ? "text-white/75" : "text-slate-500"
                }`}
              >
                {service.description}
              </p>
              {service.price > 0 && (
                <p className="mt-4 font-bold text-yellow-400">
                  ₦{service.price.toLocaleString()}
                </p>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="mb-8 border-b pb-6">
            <h2 className="text-2xl font-black text-[#061d49]">
              {serviceType}
            </h2>
            <p className="mt-2 text-slate-500">
              Fill all required details correctly.
            </p>
            {amount > 0 && (
              <p className="mt-4 inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-[#061d49]">
                Service Charge: ₦{amount.toLocaleString()}
              </p>
            )}
          </div>

          {serviceType === "Business Name Registration" && (
            <div className="grid gap-8">
              <FormSection title="Personal Information">
                <Input name="surname" label="Surname" value={form.surname} onChange={updateForm} />
                <Input name="first_name" label="First Name" value={form.first_name} onChange={updateForm} />
                <Input name="other_name" label="Other Name" value={form.other_name} onChange={updateForm} />
                <Input name="date_of_birth" label="Date of Birth" type="date" value={form.date_of_birth} onChange={updateForm} />
                <Select name="gender" label="Gender" value={form.gender} onChange={updateForm} options={["Male", "Female"]} />
                <Input name="phone" label="Phone Number" value={form.phone} onChange={updateForm} />
                <Input name="email" label="Email Address" value={form.email} onChange={updateForm} />
              </FormSection>

              <AddressSection title="Home Address" prefix="home" form={form} updateForm={updateForm} />
              <AddressSection title="Business Address" prefix="business" form={form} updateForm={updateForm} />

              <FormSection title="Business Details">
                <Textarea name="nature_of_business" label="Nature of Business" value={form.nature_of_business} onChange={updateForm} />
                <Input name="business_name_1" label="Business Name Option 1" value={form.business_name_1} onChange={updateForm} />
                <Input name="business_name_2" label="Business Name Option 2" value={form.business_name_2} onChange={updateForm} />
              </FormSection>

              <DocumentNote />

              <InfoBox
                title="Why You May Prefer Limited Liability Company"
                items={businessNameWarnings}
              />
            </div>
          )}

          {serviceType === "Limited Liability Company Registration" && (
            <div className="grid gap-8">
              <div className="rounded-3xl bg-slate-50 p-6">
                <h3 className="text-xl font-black text-[#061d49]">
                  What You Will Get
                </h3>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li>Certificate of Incorporation</li>
                  <li>Memorandum and Articles of Association (MEMART)</li>
                  <li>Tax Identification Number (TIN)</li>
                  <li>Application of Name / Status Report</li>
                </ul>
              </div>

              <FormSection title="Director Details">
                <Input name="surname" label="Surname" value={form.surname} onChange={updateForm} />
                <Input name="first_name" label="First Name" value={form.first_name} onChange={updateForm} />
                <Input name="other_name" label="Other Name" value={form.other_name} onChange={updateForm} />
                <Input name="date_of_birth" label="Date of Birth" type="date" value={form.date_of_birth} onChange={updateForm} />
                <Select name="gender" label="Gender" value={form.gender} onChange={updateForm} options={["Male", "Female"]} />
                <Input name="phone" label="Phone Number" value={form.phone} onChange={updateForm} />
                <Input name="email" label="Email Address" value={form.email} onChange={updateForm} />
              </FormSection>

              <AddressSection title="Director Home Address" prefix="director_home" form={form} updateForm={updateForm} />
              <AddressSection title="Business Address" prefix="company_business" form={form} updateForm={updateForm} />

              <FormSection title="Company Details">
                <Textarea name="nature_of_business" label="Nature of Business" value={form.nature_of_business} onChange={updateForm} />
                <Input name="business_name_1" label="Business Name Option 1" value={form.business_name_1} onChange={updateForm} />
                <Input name="business_name_2" label="Business Name Option 2" value={form.business_name_2} onChange={updateForm} />
                <Select name="board_resolution" label="Add Board Resolution Certificate? (+₦6,000)" value={form.board_resolution} onChange={updateForm} options={["no", "yes"]} />
              </FormSection>

              <PersonSection title="Secretary Details" prefix="secretary" form={form} updateForm={updateForm} />
              <PersonSection title="Witness Details" prefix="witness" form={form} updateForm={updateForm} includeEmail />

              <DocumentNote title="Compulsory Documents" />

              <InfoBox
                title="Why Choose Limited Liability Company"
                items={limitedCompanyBenefits}
              />
            </div>
          )}

          {serviceType === "Incorporated Trustees / NGO" &&  (
            <div className="grid gap-8">
                <div className="rounded-3xl bg-yellow-50 p-6">
  <h3 className="text-xl font-black text-[#061d49]">
    Trustee Pricing
  </h3>

  <p className="mt-3 text-slate-600">
    The fixed registration amount covers 2 trustees. Each additional trustee costs ₦20,000.
  </p>

  <div className="mt-5 flex flex-wrap items-center gap-4">
    <button
      type="button"
      onClick={() =>
        setAdditionalTrustees((current) => Math.max(0, current - 1))
      }
      className="rounded-full bg-slate-200 px-5 py-2 font-bold text-[#061d49]"
    >
      -
    </button>

    <div className="rounded-2xl bg-white px-6 py-3 text-center shadow-sm">
      <p className="text-sm text-slate-500">Additional Trustees</p>
      <p className="text-2xl font-black text-[#061d49]">
        {additionalTrustees}
      </p>
    </div>

    <button
      type="button"
      onClick={() =>
        setAdditionalTrustees((current) => Math.min(15, current + 1))
      }
      className="rounded-full bg-[#061d49] px-5 py-2 font-bold text-white"
    >
      +
    </button>
  </div>

  <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
    <p className="text-sm text-slate-500">Additional Trustee Fee</p>
    <p className="text-xl font-black text-[#061d49]">
      ₦{(additionalTrustees * 20000).toLocaleString()}
    </p>

    <p className="mt-3 text-sm text-slate-500">Total Amount</p>
    <p className="text-2xl font-black text-green-700">
      ₦{amount.toLocaleString()}
    </p>
  </div>
</div>
              <FormSection title="Proposed Names">
                <Input name="name_option_1" label="Option 1" value={form.name_option_1} onChange={updateForm} />
                <Input name="name_option_2" label="Option 2" value={form.name_option_2} onChange={updateForm} />
                <Input name="name_option_3" label="Option 3" value={form.name_option_3} onChange={updateForm} />
                
              </FormSection>

              <FormSection title="Organization Details">
                <Textarea name="full_address" label="Full Address" value={form.full_address} onChange={updateForm} />
                <Input name="phone" label="Phone Number" value={form.phone} onChange={updateForm} />
                <Input name="email" label="Email Address" value={form.email} onChange={updateForm} />
                <Textarea name="aims_objectives" label="Aims & Objectives" value={form.aims_objectives} onChange={updateForm} />
              </FormSection>

              <TrusteeForm
  title="Chairman Details"
  trustee={chairman}
  onChange={(field, value) => updateTrustee(setChairman, field, value)}
/>

<TrusteeForm
  title="Secretary Details"
  trustee={secretary}
  onChange={(field, value) => updateTrustee(setSecretary, field, value)}
/>

<div className="rounded-3xl bg-yellow-50 p-6">
  <h3 className="text-xl font-black text-[#061d49]">
    Additional Trustees
  </h3>

  <p className="mt-3 text-slate-600">
    The fixed registration amount covers the Chairman and Secretary. Each
    additional trustee costs ₦20,000. Maximum additional trustees: 15.
  </p>

  <div className="mt-5 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={addAdditionalTrustee}
    className="rounded-full bg-[#061d49] px-5 py-3 font-bold text-white"
  >
    Add Trustee
  </button>

  <select
    value={trusteeToRemove}
    onChange={(e) => setTrusteeToRemove(e.target.value)}
    disabled={trustees.length === 0}
    className="rounded-full border border-slate-300 bg-white px-5 py-3 font-bold text-[#061d49] disabled:opacity-50"
  >
    <option value="">Select Trustee to Remove</option>

    {trustees.map((_, index) => (
      <option key={index} value={index}>
        Trustee {index + 1}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={() => {
      if (trusteeToRemove === "") {
        alert("Please select the trustee you want to remove.");
        return;
      }

      const removeIndex = Number(trusteeToRemove);

      setTrustees((current) =>
        current.filter((_, index) => index !== removeIndex)
      );

      setAdditionalTrustees((current) => Math.max(0, current - 1));
      setTrusteeToRemove("");
    }}
    disabled={trustees.length === 0}
    className="rounded-full bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-50"
  >
    Remove Selected Trustee
  </button>
</div>

  <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
    <p className="text-sm text-slate-500">Additional Trustees</p>
    <p className="text-2xl font-black text-[#061d49]">
      {trustees.length}
    </p>

    <p className="mt-3 text-sm text-slate-500">Additional Trustee Fee</p>
    <p className="text-xl font-black text-[#061d49]">
      ₦{(trustees.length * 20000).toLocaleString()}
    </p>

    <p className="mt-3 text-sm text-slate-500">Total Amount</p>
    <p className="text-2xl font-black text-green-700">
      ₦{amount.toLocaleString()}
    </p>
  </div>
</div>

{trustees.map((trustee, index) => (
  <TrusteeForm
    key={index}
    title={`Trustee ${index + 1}`}
    trustee={trustee}
    onChange={(field, value) =>
      updateAdditionalTrustee(index, field, value)
    }
  />
))}

              <DocumentNote title="Trustee Documents Needed" />
            </div>
          )}

          {serviceType === "SCUML Registration" && (
            <div className="grid gap-8">
              <div className="rounded-3xl bg-yellow-50 p-6">
                <h3 className="text-xl font-black text-[#061d49]">
                  SCUML Registration
                </h3>
                <p className="mt-3 text-slate-600">
                  Price: ₦65,000. Duration: 7 working days.
                </p>
              </div>

              <FormSection title="Director Details">
                <Input name="director_name" label="Director Name" value={form.director_name} onChange={updateForm} />
                <Input name="tin" label="TIN" value={form.tin} onChange={updateForm} />
                <Input name="nin" label="NIN" value={form.nin} onChange={updateForm} />
                <Input name="bvn" label="BVN of Any Director" value={form.bvn} onChange={updateForm} />
                <Textarea name="bank_details" label="Director Bank Account Details" value={form.bank_details} onChange={updateForm} />
                <Input name="email" label="Email Address" value={form.email} onChange={updateForm} />
                <Input name="phone" label="Phone Number" value={form.phone} onChange={updateForm} />
                <Textarea name="company_address" label="Company Address" value={form.company_address} onChange={updateForm} />
                <Textarea name="nature_of_business" label="Nature of Business" value={form.nature_of_business} onChange={updateForm} />
              </FormSection>

              <div className="rounded-3xl bg-slate-50 p-6">
                <h3 className="text-xl font-black text-[#061d49]">
                  Documents Needed
                </h3>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li>All CAC Documents</li>
                  <li>TIN Slip</li>
                  <li>Means of Identification / NIN Slip</li>
                  <li>Proficiency Certificate for some business categories</li>
                </ul>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={submitForm}
            disabled={loading}
            className="mt-10 w-full rounded-full bg-[#061d49] px-8 py-4 font-black text-white transition hover:bg-[#0b63f6] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application & Proceed to Payment"}
          </button>
        </div>
      </section>
    </main>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-5 text-xl font-black text-[#061d49]">{title}</h3>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Input({
  name,
  label,
  value,
  onChange,
  type = "text",
}: {
  name: string;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  value,
  onChange,
}: {
  name: string;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
      {label}
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
      />
    </label>
  );
}

function Select({
  name,
  label,
  value,
  onChange,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select
        name={name}
        value={value || options[0]}
        onChange={onChange}
        className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function AddressSection({
  title,
  prefix,
  form,
  updateForm,
}: {
  title: string;
  prefix: string;
  form: Record<string, string>;
  updateForm: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <FormSection title={title}>
      <Input name={`${prefix}_state`} label="State" value={form[`${prefix}_state`]} onChange={updateForm} />
      <Input name={`${prefix}_lga`} label="LGA" value={form[`${prefix}_lga`]} onChange={updateForm} />
      <Input name={`${prefix}_city`} label="City/Town/Village" value={form[`${prefix}_city`]} onChange={updateForm} />
      <Input name={`${prefix}_house_number`} label="House Number" value={form[`${prefix}_house_number`]} onChange={updateForm} />
      <Input name={`${prefix}_street_name`} label="Street Name" value={form[`${prefix}_street_name`]} onChange={updateForm} />
    </FormSection>
  );
}

function PersonSection({
  title,
  prefix,
  form,
  updateForm,
  includeEmail = false,
}: {
  title: string;
  prefix: string;
  form: Record<string, string>;
  updateForm: React.ChangeEventHandler<HTMLInputElement>;
  includeEmail?: boolean;
}) {
  return (
    <>
      <FormSection title={title}>
        <Input name={`${prefix}_surname`} label="Surname" value={form[`${prefix}_surname`]} onChange={updateForm} />
        <Input name={`${prefix}_first_name`} label="First Name" value={form[`${prefix}_first_name`]} onChange={updateForm} />
        <Input name={`${prefix}_other_name`} label="Other Name" value={form[`${prefix}_other_name`]} onChange={updateForm} />
        <Input name={`${prefix}_date_of_birth`} label="Date of Birth" type="date" value={form[`${prefix}_date_of_birth`]} onChange={updateForm} />
        <Input name={`${prefix}_gender`} label="Gender" value={form[`${prefix}_gender`]} onChange={updateForm} />
        <Input name={`${prefix}_phone`} label="Phone Number" value={form[`${prefix}_phone`]} onChange={updateForm} />
        {includeEmail && (
          <Input name={`${prefix}_email`} label="Email Address" value={form[`${prefix}_email`]} onChange={updateForm} />
        )}
      </FormSection>
      <AddressSection title={`${title} Home Address`} prefix={`${prefix}_home`} form={form} updateForm={updateForm} />
      <AddressSection title={`${title} Business Address`} prefix={`${prefix}_business`} form={form} updateForm={updateForm} />
    </>
  );
}

function DocumentNote({ title = "Supporting Documents" }: { title?: string }) {
  return (
    <div className="rounded-3xl bg-yellow-50 p-6">
      <h3 className="text-xl font-black text-[#061d49]">{title}</h3>
      <p className="mt-3 text-slate-600">
        After submitting this form, customers should send required documents
        such as ID card/NIN slip, passport photograph, signature, CAC documents,
        TIN slip, or other applicable documents through the official Joyful-Light
        contact channel.
      </p>
    </div>
  );
}
function TrusteeForm({
  title,
  trustee,
  onChange,
}: {
  title: string;
  trustee: Trustee;
  onChange: (field: keyof Trustee, value: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
      <h3 className="mb-5 text-xl font-black text-[#061d49]">{title}</h3>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Surname *
          <input
            value={trustee.surname}
            onChange={(e) => onChange("surname", e.target.value)}
            required
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Last Name *
          <input
            value={trustee.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            required
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Other Name *
          <input
            value={trustee.other_name}
            onChange={(e) => onChange("other_name", e.target.value)}
            required
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Date of Birth *
          <input
            type="date"
            value={trustee.date_of_birth}
            onChange={(e) => onChange("date_of_birth", e.target.value)}
            required
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Gender *
          <select
            value={trustee.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            required
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Phone Number *
          <input
  type="tel"
  value={trustee.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      onChange("phone", value);
    }
  }}
  required
  maxLength={11}
  pattern="[0-9]{11}"
  placeholder="08140077567"
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Email Address *
          <input
  type="email"
  value={trustee.email}
  onChange={(e) => onChange("email", e.target.value)}
  required
  placeholder="johnclaires@gmail.com"
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Occupation *
          <input
            value={trustee.occupation}
            onChange={(e) => onChange("occupation", e.target.value)}
            required
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          NIN Number *
          <input
  value={trustee.nin}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      onChange("nin", value);
    }
  }}
  required
  maxLength={11}
  pattern="[0-9]{11}"
  placeholder="55345678901"
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
          Address *
          <textarea
            value={trustee.address}
            onChange={(e) => onChange("address", e.target.value)}
            required
            className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0b63f6]"
          />
        </label>
      </div>
    </section>
  );
}
function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-6">
      <h3 className="text-xl font-black text-[#061d49]">{title}</h3>
      <ul className="mt-4 space-y-3 text-slate-600">
        {items.map((item) => (
          <li key={item}>✅ {item}</li>
        ))}
      </ul>
    </div>
  );
}
