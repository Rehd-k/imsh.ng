import Image from "next/image";
import Link from "next/link";
import { hospital, navLinks, services } from "@/lib/hospital";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/imsh.png"
              alt=""
              width={96}
              height={96}
              className="h-12 w-12 rounded-md bg-black object-contain"
            />
            <p className="font-serif text-xl leading-tight">
              {hospital.shortName}
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {hospital.name}, at Ekit Itam II on the Uyo–Ikot Ekpene Road.
          </p>
          <p className="mt-6 text-xs tracking-wide text-white/45">
            Powered by Vessel
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Visit
          </h2>
          <address className="mt-4 space-y-2 text-sm leading-relaxed text-white/75 not-italic">
            <p>{hospital.street}</p>
            <p>{hospital.locality}</p>
            <p>
              <a className="hover:text-white" href={`tel:${hospital.phoneTel}`}>
                {hospital.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`mailto:${hospital.email}`}>
                {hospital.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Care
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  className="hover:text-white"
                  href={`/services#${service.slug}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Patients
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>{hospital.clinicHours}</li>
            <li>{hospital.emergencyHours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/45 sm:px-8">
          © {hospital.name}. Akwa Ibom State.
        </p>
      </div>
    </footer>
  );
}
