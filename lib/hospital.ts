export const hospital = {
  name: "Ibom Multi-Specialty Hospital",
  shortName: "IMSH",
  phoneDisplay: "(+234) 802-5001-790",
  phoneTel: "+2348025001790",
  email: "ibomspecialisthospitaluyo@gmail.com",
  street: "Ekit Itam II, Uyo–Ikot Ekpene Road",
  locality: "Uyo, Akwa Ibom State, Nigeria",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ibom+Multi-Specialty+Hospital+Ekit+Itam+Uyo",
  clinicHours: "Monday to Sunday, 8:00am to 5:00pm",
  emergencyHours: "The emergency department is open 24 hours.",
} as const;

export const siteDescription =
  "Ibom Multi-Specialty Hospital in Ekit Itam, Akwa Ibom. Emergency care is open 24 hours, specialist clinics run every day, and the patient app carries appointments, results, and bills.";

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/app/get", label: "The app" },
  { href: "/contact", label: "Contact" },
] as const;

export const facts = [
  {
    value: "2015",
    label: "Commissioned by the Akwa Ibom State Government.",
  },
  {
    value: "Quaternary",
    label: "Intensive care, surgery, and diagnostics on one campus.",
  },
  {
    value: "24 hours",
    label: "The emergency department does not close.",
  },
] as const;

export const services = [
  {
    slug: "emergency",
    title: "Accident and emergency",
    summary: "Open through the night for injuries and sudden illness.",
    paragraphs: [
      "The emergency department is staffed around the clock. People arrive with a fresh injury, a worsening illness, or a condition that cannot wait for a clinic appointment.",
      "The team triages, assesses, and starts treatment, then admits the person or moves them on when they need a ward, a theatre, or intensive care.",
    ],
  },
  {
    slug: "intensive-care",
    title: "Intensive care",
    summary: "Continuous monitoring for people who are critically ill.",
    paragraphs: [
      "The intensive care unit is for patients whose breathing, circulation, or consciousness needs constant attention.",
      "Clinicians and monitoring stay with the person while the rest of the hospital treats the illness underneath.",
    ],
  },
  {
    slug: "surgery",
    title: "Surgery",
    summary:
      "Theatres for orthopaedic, cardiovascular, neurosurgical, and other specialist operations.",
    paragraphs: [
      "Surgeons at IMSH operate across several specialties, including orthopaedics, cardiovascular surgery, and neurosurgery.",
      "Theatre time is planned with anaesthesia and the wards, so an operation is a coordinated piece of hospital work rather than a single room.",
    ],
  },
  {
    slug: "radiology",
    title: "Radiology",
    summary: "X-ray, CT, MRI, and ultrasound, read with the clinical team.",
    paragraphs: [
      "Imaging sits beside the clinics and the emergency department. The service covers plain X-ray, CT, MRI, and ultrasound.",
      "Radiologists and radiographers produce the pictures the treating clinicians use to decide what happens next.",
    ],
  },
  {
    slug: "laboratory",
    title: "Laboratory",
    summary: "Blood work and other tests that confirm a diagnosis.",
    paragraphs: [
      "The laboratory handles routine blood tests and more specialised investigations.",
      "Samples are processed so results can return to the clinician who ordered them, and to the patient in the app once they are released.",
    ],
  },
  {
    slug: "dialysis",
    title: "Dialysis",
    summary: "Regular sessions for people living with kidney failure.",
    paragraphs: [
      "The dialysis unit is set up for people who need ongoing kidney replacement therapy.",
      "Sessions are planned, and the nursing team stays with the patient, so a treatment that has to be repeated can be repeated safely.",
    ],
  },
  {
    slug: "obstetrics-gynaecology",
    title: "Obstetrics and gynaecology",
    summary: "Pregnancy, birth, recovery, and gynaecological care.",
    paragraphs: [
      "The service follows women through pregnancy, delivery, and the days after birth. It also treats gynaecological conditions that are not part of a current pregnancy.",
      "Care is coordinated with the theatre and the wards, including when a newborn needs further attention.",
    ],
  },
  {
    slug: "antenatal",
    title: "Antenatal care",
    summary: "Scheduled checks, scans, and preparation for birth.",
    paragraphs: [
      "Antenatal visits are a series, not a single scan. Expectant mothers are seen for regular health checks, ultrasound, advice on food and rest, and preparation for labour.",
      "The aim is a pregnancy the mother understands, and a plan for the birth.",
    ],
  },
  {
    slug: "dentistry",
    title: "Dentistry",
    summary: "Check-ups, preventive care, and oral surgery.",
    paragraphs: [
      "Dentists, oral surgeons, and hygienists see people for routine examinations and for treatment that needs a specialist.",
      "Preventive care sits alongside procedures, so a problem can be handled before it becomes an emergency.",
    ],
  },
] as const;

export const appFeatures = [
  {
    title: "Appointments",
    detail: "See what is booked, and follow a visit from the phone.",
  },
  {
    title: "Results",
    detail: "Read laboratory and radiology reports released by the hospital.",
  },
  {
    title: "Medications",
    detail: "Keep the list of medicines prescribed for you.",
  },
  {
    title: "Bills",
    detail: "Look up charges and what has been paid.",
  },
  {
    title: "Theatre",
    detail: "See an operation once it has been scheduled.",
  },
  {
    title: "Emergency",
    detail: "Send an emergency request from the phone.",
  },
  {
    title: "Family",
    detail: "Open records for family members linked to the account.",
  },
  {
    title: "Health card",
    detail: "Carry the hospital card without the paper copy.",
  },
] as const;

export const hospitalJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: hospital.name,
  url: "https://imsh.ng",
  telephone: hospital.phoneTel,
  email: hospital.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: hospital.street,
    addressLocality: "Uyo",
    addressRegion: "Akwa Ibom",
    addressCountry: "NG",
  },
  openingHours: "Mo-Su 08:00-17:00",
};
