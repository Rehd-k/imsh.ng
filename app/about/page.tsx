import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { hospital } from "@/lib/hospital";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ibom Multi-Specialty Hospital was commissioned in 2015 at Ekit Itam II, on the Uyo–Ikot Ekpene Road, to bring quaternary care to Akwa Ibom.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the hospital"
        title="Quaternary care, commissioned for Akwa Ibom."
        lede="IMSH stands at Ekit Itam II so that people who need intensive care, a complex operation, or advanced tests do not have to leave the state to find them."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_280px] lg:py-24">
        <article className="max-w-2xl space-y-12 text-lg leading-relaxed text-muted">
          <section>
            <h2 className="font-serif text-3xl tracking-tight text-ink">
              The hospital
            </h2>
            <p className="mt-4">
              {hospital.name} is the quaternary hospital of Akwa Ibom State. It
              was commissioned in 2015 by the Akwa Ibom State Government, on
              the understanding that complex care should be available at home.
            </p>
            <p className="mt-4">
              The campus holds the emergency department, the wards, the
              theatres, intensive care, and the diagnostic services that those
              teams rely on. A person can be seen, imaged, tested, and
              operated on without being sent across the country for the next
              step.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl tracking-tight text-ink">
              What quaternary means here
            </h2>
            <p className="mt-4">
              A general hospital treats common illness. A specialist hospital
              adds particular departments. Quaternary care is the step beyond
              that: intensive monitoring, operations that need a full theatre
              team, and diagnostic work such as CT, MRI, and a broad
              laboratory, available in the same place as the wards.
            </p>
            <p className="mt-4">
              That is the standard this hospital was built to hold. It does
              not replace the clinics people already use for ordinary care. It
              is where the next level of treatment is given.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl tracking-tight text-ink">
              Hours and arrival
            </h2>
            <p className="mt-4">
              The hospital is at {hospital.street}, {hospital.locality}.
              Clinics and reception are open every day from 8:00am to 5:00pm.
              The emergency department does not keep those hours. It is open
              through the night.
            </p>
            <p className="mt-4">
              People who already have a hospital number can use the patient
              app to see appointments, results, medicines, bills, and theatre
              plans. Sign-in is the patient ID and date of birth. A first
              visit still begins at the front desk.
            </p>
          </section>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/services">See the services</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Plan a visit
            </ButtonLink>
          </div>
        </article>
        <aside className="h-fit rounded-3xl bg-ink p-7 text-white lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            At a glance
          </p>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-sm text-white/55">Opened</dt>
              <dd className="mt-1 font-serif text-2xl">2015</dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">Clinics</dt>
              <dd className="mt-1 text-base leading-snug">
                Every day, 8:00am to 5:00pm
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">Emergency</dt>
              <dd className="mt-1 text-base leading-snug">Open 24 hours</dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">Telephone</dt>
              <dd className="mt-1">
                <a
                  className="font-serif text-2xl hover:text-gold"
                  href={`tel:${hospital.phoneTel}`}
                >
                  {hospital.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
