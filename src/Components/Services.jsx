import Footer from "./Footer";
import Navbar from "./Navbar";
import { navLinks, services } from "../data/siteData";

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar links={navLinks} />

      <section className="bg-slate-950 px-6 pb-16 pt-14 text-white">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            Service Portfolio
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            End-to-End Freight Services
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Full lifecycle logistics support from booking and rail movement to
            warehousing, tracking, and last-mile completion.
          </p>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-3xl">{service.icon}</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-cyan-700">
                    {service.category}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                </div>
                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {service.sla}
                </span>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Service Highlights
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {service.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Ideal For
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{service.idealFor}</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                  Execution Workflow
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {service.process.map((step, index) => (
                    <span
                      key={step}
                      className="rounded-full border border-cyan-300 bg-white px-3 py-1 text-xs font-medium text-cyan-800"
                    >
                      {index + 1}. {step}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
