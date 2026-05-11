"use client"; 
import Link from "next/link";
import React, { useEffect, useState } from "react"; 
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, MessageCircle, BarChart3, Globe2, FileText, Building2, PenTool, ChevronDown } from "lucide-react";

const company = {
  name: "Joyful-Light Scientific and Technology Limited",
  shortName: "Joyful-Light",
  location: "Osogbo, Osun State, Nigeria",
  phone: "+2348160230048",
  whatsapp: "2348160230048",
  email: "joyfulllightscifitech@gmail.com",
};
const services = [
  {
    title: "IT Services",
    icon: Globe2,
    text: "Reliable technology support, digital solutions, and IT consulting for businesses and individuals.",
  },
  {
    title: "Data Analysis & Dashboards",
    icon: BarChart3,
    text: "Professional data cleaning, reporting, visualization, and dashboard creation for better decisions.",
  },
  {
    title: "Website Creation",
    icon: Globe2,
    text: "Modern, responsive, fast-loading websites for companies, brands, schools, and organizations.",
  },
  {
    title: "CAC Registrations",
    icon: Building2,
    text: "Business name, company registration, documentation support, and compliance guidance.",
  },
  {
    title: "Writing Services",
    icon: PenTool,
    text: "Academic, business, proposal, report, content, and professional writing services.",
  },
  {
    title: "Business Documentation",
    icon: FileText,
    text: "Company profiles, proposals, business plans, reports, and official document preparation.",
  },
];

const projects = [
  "Business Website Design",
  "Sales Dashboard Creation",
  "CAC Registration Support",
  "Company Profile Writing",
];

const faqs = [
  {
    q: "Do you build websites for small businesses?",
    a: "Yes. We build responsive business websites, landing pages, portfolios, and company websites.",
  },
  {
    q: "Can you create business dashboards?",
    a: "Yes. We create dashboards using business data to show performance, trends, and useful insights.",
  },
  {
    q: "Do you handle CAC registration?",
    a: "Yes. We support CAC business name and company registration processes.",
  },
  {
    q: "Can the website content be edited later?",
    a: "Yes. The final version can include an admin-editable setup using a CMS or simple admin dashboard.",
  },
];

function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">{label}</p>
      <h2 className="text-3xl font-black text-slate-950 md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-slate-600">{text}</p>}
    </div>
  );
}

export default function JoyfulLightWebsite() {
  const [open, setOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setShowCertificate((current) => !current);
  }, 4000);

  return () => clearInterval(interval);
}, []);
  const [activeFaq, setActiveFaq] = useState(0);

  const nav = ["Home", "About Us", "Our Services", "Projects", "Our Team", "FAQ", "Blog", "Contact Us", "Seek Support"];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-slate-900">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#061d49]/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-2">
<div className="flex flex-col items-center">
  <img
    src="/logo1.png"
    alt="Joyful-Light Logo"
    className="h-14 w-14 object-contain sm:h-20 sm:w-20"
  />

  <p className="-mt-1 text-[10px] font-semibold text-white/70">
    RC: 8554718
  </p>
</div>

  <div>
    <p className="text-lg font-black text-white">JOYFUL-LIGHT</p>
    <p className="-ml-3 text-xs font-bold text-yellow-300">
      SCIENTIFIC AND TECH LTD.
    </p>
    
  </div>
</a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a key={item} href={item === "Payment" ? "/payment" : `#${item.toLowerCase()}`} className="text-sm font-semibold text-white/80 transition hover:text-yellow-300">
                {item}
              </a>
            ))}
          </div>

          <a href={`https://wa.me/${company.whatsapp}`} className="hidden rounded-full bg-yellow-400 px-5 py-3 text-sm font-black text-[#061d49] shadow-lg shadow-yellow-900/20 transition hover:-translate-y-0.5 lg:inline-flex">
            WhatsApp Us
          </a>

          <button onClick={() => setOpen(!open)} className="text-white lg:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
       

        {open && (
          <div className="border-t border-white/10 bg-[#061d49] px-5 py-5 lg:hidden">
            <div className="grid gap-4">
              {nav.map((item) => (
                <a onClick={() => setOpen(false)} key={item} href={`#${item.toLowerCase()}`} className="font-semibold text-white/85">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      <section id="home" className="relative w-full overflow-x-hidden bg-[#061d49] pt-24">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0b63f6_0%,transparent_34%),radial-gradient(circle_at_bottom_left,#ffd84d_0%,transparent_22%)] opacity-70" />

  <div className="relative mx-auto grid w-full max-w-7xl items-start gap-8 px-4 py-8 lg:min-h-[720px] lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-6 w-full overflow-hidden py-2">
        <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap text-sm font-bold text-red-500">
          ⚠️ Please Note: This Website is undergoing Development, Please Check Back Later🥴🥴
        </div>
      </div>

      <h1 className="text-2xl font-extrabold leading-tight text-white md:text-3xl">
        MEET OUR CEO
      </h1>

      <div className="mt-10">
        <img
          src="/CEO.png"
          alt="CEO of Joyful-Light Scientific and Technology Limited"
          className="mt-4 h-[320px] w-full max-w-sm rounded-3xl object-cover shadow-2xl sm:h-[420px] lg:h-[500px]"
        />
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-yellow-300">
          Oladipo Busayo
        </h2>

        <p className="mt-4 text-base leading-7 text-white/80">
          I am the CEO of Joyful-Light Scientific and Technology Limited, a company committed to providing reliable IT services, data analysis, dashboard creation, website development, CAC registration support, and professional writing services.
        </p>

        <p className="mt-4 text-base leading-7 text-white/80">
          My vision is to help businesses, entrepreneurs, and organizations use technology, data, and professional documentation to grow, improve operations, and build a stronger digital presence.
        </p>
      </div>

      <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
        {company.name} provides professional IT services, dashboard creation, website development, CAC registration support, and writing services from {company.location}.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <a
          href="#contact"
          className="rounded-full bg-yellow-400 px-8 py-4 text-center font-black text-[#061d49] shadow-xl shadow-yellow-900/20 transition hover:-translate-y-1"
        >
          Request a Service
        </a>

        <a
          href="#services"
          className="rounded-full border border-white/25 px-8 py-4 text-center font-black text-white transition hover:bg-white hover:text-[#061d49]"
        >
          Explore Services
        </a>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative mt-4 lg:-mt-[28rem]"
    >

        <div className="rounded-[1.5rem] bg-[#0b63f6] p-6 text-white">
         <motion.div
            key={showCertificate ? "certificate" : "legal"}
               initial={{
    opacity: 0,
    y: 40,
    scale: 0.92,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
 exit={{
  opacity: 0,
  rotate: -12,
  scale: 0.3,
  x: -120,
  y: 120,
}}
 transition={{
  duration: 1.8,
  type: "spring",
  stiffness: 80,
  damping: 8,
}}
  >
  {showCertificate ? (
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
                Evidence of Registration  
              </p>

              <img
                src="/joyfulcac.png"
                alt="Joyful-Light CAC Certificate"
                className="h-[280px] w-full rounded-2xl bg-white object-contain p-3 sm:h-[360px] lg:h-[420px]"
              />
            </div>
          ) : (
            <div className="flex min-h-[420px] flex-col justify-center rounded-2xl bg-white/10 p-6 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
                Legal Entity Status
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight text-white">
                Registered Legal Entity in Nigeria
              </h2>

              <p className="mt-5 leading-8 text-white/85">
                Joyful-Light Scientific and Technology Limited is registered as a legal entity under the Corporate Affairs Commission (CAC) in Nigeria.
              </p>

              <p className="mt-5 leading-8 text-white/85">
                This is supported by the Companies and Allied Matters Act, 2020 (CAMA 2020), which provides the legal framework for the incorporation of companies, registration of business names, and incorporation of trustees in Nigeria.
              </p>

              <p className="mt-5 text-sm font-bold text-yellow-300">
                RC: 8554718
              </p>
            </div>
          )}
          </motion.div>
        </div>
      
    </motion.div>
  </div>
</section>

      <section id="about" className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#0b63f6]">About Us</p>
            <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-5xl">A technology company focused on practical business growth.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Joyful-Light Scientific and Technology Limited helps individuals, startups, and organizations use technology, data, documentation, and digital presence to work smarter and grow faster.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {["Professional Service", "Fast Delivery", "Responsive Support", "Business-Focused"].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-100 bg-slate-50 p-7 shadow-sm">
                <div className="mb-5 h-1.5 w-16 rounded-full bg-yellow-400" />
                <p className="text-xl font-black text-[#061d49]">{item}</p>
              </div>
            ))}
            
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50 px-5 py-24 lg:px-8">
        <SectionTitle label="What We Do" title="Our Services" text="We provide practical digital and professional services for businesses, students, entrepreneurs, and organizations." />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
  key={service.title}
  href={
    service.title === "CAC Registrations"
      ? "/services/cac-registration"
      : "#"
  }
  className="block rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b63f6] text-white">
                  <Icon />
                </div>
                <h3 className="text-2xl font-black text-slate-950">{service.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{service.text}</p>
              </Link>
            );
          })}
          
        </div>
      </section>

      <section id="projects" className="bg-[#061d49] px-5 py-24 text-white lg:px-8">
        <SectionTitle label="Portfolio" title="Projects & Portfolio" text="A clean section for showcasing completed jobs, dashboards, websites, and client work." />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <div key={project} className="rounded-[2rem] bg-white/10 p-7 backdrop-blur">
              <p className="text-sm font-black text-yellow-300">0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-black">{project}</h3>
            </div>
          ))}
          
        </div>
      </section>

    <section id="team" className="bg-white px-5 py-24 lg:px-8">
  <SectionTitle
    label="Our Team"
    title="Professional Team"
    text="Our Creative Team."
  />

  <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
    {["Managing Director", "Technology Lead", "Client Support"].map(
      (role) => (
        <div
          key={role}
          className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 text-center shadow-sm"
        >
          <img
            src={
              role === "Managing Director"
                ? "/MD.png"
                : role === "Technology Lead"
                ? "/TL.png"
                : "/CS.png"
            }
            alt={role}
            className="mx-auto mb-5 h-28 w-28 rounded-full object-cover shadow-lg"
          />

          <h3 className="text-xl font-black text-[#061d49]">
            {role}
          </h3>

          <p className="mt-2 text-slate-500">
            Team Member
          </p>
        </div>
      )
    )}
  </div>
</section>

      <section id="faq" className="bg-slate-50 px-5 py-24 lg:px-8">
        <SectionTitle label="FAQ" title="Frequently Asked Questions" />
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <button key={faq.q} onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} className="w-full rounded-3xl bg-white p-6 text-left shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-black text-slate-950">{faq.q}</h3>
                <ChevronDown className={`transition ${activeFaq === index ? "rotate-180" : ""}`} />
              </div>
              {activeFaq === index && <p className="mt-4 leading-7 text-slate-600">{faq.a}</p>}
            </button>
          ))}
        </div>
      </section>

      <section id="blog" className="bg-white px-5 py-24 lg:px-8">
        <SectionTitle label="Blog & News" title="Latest Updates" text="Use this section for business tips, technology news, CAC registration guides, and data analysis articles." />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {["Why every business needs a website", "How dashboards help decision making", "Simple guide to CAC registration"].map((post) => (
            <article key={post} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-bold text-[#0b63f6]">News</p>
              <h3 className="mt-4 text-2xl font-black">{post}</h3>
              <p className="mt-4 leading-7 text-slate-600">Short blog preview will appear here. This can be connected to an admin-editable CMS.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#0b63f6] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="text-white">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Contact Us</p>
            <h2 className="text-4xl font-black md:text-5xl">Let’s discuss your next project.</h2>
            <div className="mt-8 space-y-4 text-lg">
              <p className="flex items-center gap-3"><MapPin /> {company.location}</p>
              <p className="flex items-center gap-3"><Phone /> {company.phone}</p>
              <p className="flex items-center gap-3"><Mail /> {company.email}</p>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
  <a
    href="/payment"
    className="rounded-[2rem] bg-white p-6 shadow-xl transition hover:-translate-y-1"
  >
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
      <FileText />
    </div>

    <h3 className="text-xl font-black text-[#061d49]">
      Click to Log Issues
    </h3>

    <p className="mt-3 leading-7 text-slate-600">
      Report payment issues, failed transactions, debit problems, or upload
      your receipt/screenshot for quick review.
    </p>
  </a>

  <a
    href="/support"
    className="rounded-[2rem] bg-white p-6 shadow-xl transition hover:-translate-y-1"
  >
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-[#061d49]">
      <MessageCircle />
    </div>

    <h3 className="text-xl font-black text-[#061d49]">
      Other Issues
    </h3>

    <p className="mt-3 leading-7 text-slate-600">
      Log complaints, service issues, delays, support concerns, or other
      business-related issues.
    </p>
  </a>
</div>
            </div>
          </div>

          <form className="rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="grid gap-5">
              <input className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0b63f6]" placeholder="Full Name" />
              <input className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0b63f6]" placeholder="Email Address" />
              <input className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0b63f6]" placeholder="Phone Number" />
              <textarea className="min-h-36 rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#0b63f6]" placeholder="Tell us what you need" />
              <button type="button" className="rounded-full bg-[#061d49] px-8 py-4 font-black text-white transition hover:bg-[#0b63f6]">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-[#061d49] px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="font-bold">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="text-white/60">Built for speed, SEO, mobile responsiveness, and admin-editable content readiness.</p>
        </div>
      </footer>

      {!open && (
  <div className="fixed bottom-5 right-5 z-[99999] flex flex-col gap-3">
    <a
      href={`tel:${company.phone}`}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-[#061d49] shadow-xl"
      aria-label="Call Joyful-Light"
    >
      <Phone />
    </a>

    

    <a
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle />
    </a>
  </div>
)}
    </main>
  );
}