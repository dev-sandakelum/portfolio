import { PERSON } from "@/lib/portfolio/data";

const BASE_URL = "https://sandakelum.vercel.app";

/**
 * JSON-LD structured data for the portfolio homepage.
 * Renders a Person schema to help search engines understand
 * who this site belongs to.
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.fullName,
    url: BASE_URL,
    email: PERSON.email,
    jobTitle: "ICT Undergraduate & Full-Stack Developer",
    description:
      "Microsoft Student Ambassador and full-stack developer from Sri Lanka building modern web apps, open-source projects, and developer content in Sinhala and English.",
    image: `${BASE_URL}/portfolio/me.png`,
    sameAs: [PERSON.github, PERSON.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Ruhuna",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LK",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "Node.js",
      "Azure",
      "AI/ML",
      "Web Development",
      "Open Source",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
