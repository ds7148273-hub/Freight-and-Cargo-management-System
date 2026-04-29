import { Link } from "react-router-dom";

export default function ServicesGrid({ services }) {
  return (
    <section className="bg-slate-50 py-20" id="services">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
          What We Offer
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          End-to-End Freight Services
        </h2>
        <p className="mt-3 max-w-xl text-slate-600">
          Built for operational teams who need consistency, speed, and
          visibility from booking to last-mile completion.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
            >
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                {service.category}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
              <p className="mt-3 text-xs text-slate-500">{service.sla}</p>
              <Link
                to={`/services#${service.id}`}
                className="mt-4 inline-block text-sm font-semibold text-cyan-700"
              >
                Learn more →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/services"
            className="inline-flex rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View All Service Workflows
          </Link>
        </div>
      </div>
    </section>
  );
}
