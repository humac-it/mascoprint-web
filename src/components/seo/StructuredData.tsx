import { CONTACT } from '@/config/contact'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mascoprint Developments Ltd',
    alternateName: 'Mascoprint',
    url: 'https://mascoprint.co.uk',
    logo: 'https://mascoprint.co.uk/images/logo/mascoprint-logo-main.png',
    description: 'Family-run industrial printing company specializing in screen and pad printing manufacturing with 50+ years experience.',
    foundingDate: '1970',
    email: CONTACT.email,
    telephone: CONTACT.phoneSchema,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${CONTACT.address.street}, ${CONTACT.address.area}`,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.county,
      postalCode: CONTACT.address.postcode,
      addressCountry: CONTACT.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneSchema,
      contactType: 'customer service',
      email: CONTACT.email,
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/mascoprint',
      'https://www.youtube.com/@mascoprint',
      'https://uk.linkedin.com/company/mascoprint-developments-limited',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://mascoprint.co.uk/#localbusiness',
    name: 'Mascoprint Developments Ltd',
    image: 'https://mascoprint.co.uk/images/logo/mascoprint-logo-main.png',
    description: 'Industrial printing specialists providing screen printing, pad printing, and cylindrical printing services to aerospace, automotive, defence, medical, and plastics sectors.',
    priceRange: '$$',
    telephone: CONTACT.phoneSchema,
    email: CONTACT.email,
    url: 'https://mascoprint.co.uk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${CONTACT.address.street}, ${CONTACT.address.area}`,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.county,
      postalCode: CONTACT.address.postcode,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.8084,
      longitude: -0.4637,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Industrial Printing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Screen Manufacturing',
            description: 'Comprehensive screen solutions including frames, mesh, stretched screens, pre-sensitised screens, and ready-to-use exposed screens.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Artwork Origination',
            description: 'Generate, scan, and manipulate artwork using the latest computer technology including Adobe Illustrator and Adobe Photoshop.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cliché Plate Manufacture',
            description: 'High quality etching service on thin steel plate for pad printing applications.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://mascoprint.co.uk/#website',
    url: 'https://mascoprint.co.uk',
    name: 'Mascoprint - Screen & Pad Printing Specialists',
    description: 'Industrial printing company specializing in screen and pad printing for aerospace, automotive, defence, medical, and plastics sectors.',
    publisher: {
      '@id': 'https://mascoprint.co.uk/#organization',
    },
    inLanguage: 'en-GB',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
