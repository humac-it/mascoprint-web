import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DynamicPartnerLogos } from '@/components/DynamicComponents'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Mascoprint is a family-run industrial printing company with 50+ years of experience in screen and pad printing. Serving aerospace, automotive, defence, medical, plastics, and glassware sectors across the UK.',
  openGraph: {
    title: 'Mascoprint - Screen & Pad Printing Specialists',
    description: 'Family-run industrial printing company with 50+ years of experience in screen and pad printing for aerospace, automotive, defence, and medical sectors.',
    url: 'https://mascoprint.co.uk',
    siteName: 'Mascoprint',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mascoprint - Screen & Pad Printing Specialists',
    description: 'Family-run industrial printing company with 50+ years of experience in screen and pad printing.',
  },
  alternates: {
    canonical: 'https://mascoprint.co.uk',
  },
}

const services = [
  {
    title: 'Screen Manufacturing',
    description: 'Comprehensive screen solutions including frames, mesh, stretched screens, pre-sensitised screens, and ready-to-use exposed screens.',
    number: '01',
  },
  {
    title: 'Artwork Origination',
    description: 'Generate, scan, and manipulate artwork using the latest computer technology including Adobe Illustrator® and Adobe Photoshop®.',
    number: '02',
  },
  {
    title: 'Cliché Plate Manufacture',
    description: 'High quality etching service on 0.5mm and 0.3mm thin steel plate for pad printing applications.',
    number: '03',
  },
]

const sectors = [
  'Aerospace',
  'Automotive',
  'Defence',
  'Medical',
  'Plastics',
  'Glassware',
  'Research and Development',
]

const trainingPrograms = [
  'Cylindrical screen-printing',
  'Flat screen-printing',
  'Pad printing',
  'Ergonomics in production',
]

const consultancyServices = [
  'Equipment and consumables selection',
  'Technical and scientific requirements',
  'Production troubleshooting',
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section spacing="lg" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-brand-50/30 pt-14 md:pt-20 pb-10 md:pb-14">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(2, 132, 199, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 132, 199, 0.1) 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
          {/* Gradient Blobs */}
          <div className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[600px] h-72 sm:h-96 lg:h-[600px] bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-72 lg:w-[400px] h-48 sm:h-72 lg:h-[400px] bg-brand-400/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

          {/* Decorative Geometric Shapes */}
          <div className="absolute top-20 right-1/4 w-32 h-32 border-2 border-brand-600/20 rounded-lg rotate-12 hidden lg:block" />
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-brand-600/10 rounded-full hidden lg:block" />
        </div>

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            {/* Text Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-brand-600/10 border border-brand-600/20 rounded-full mb-8">
                <div className="w-2 h-2 bg-brand-600 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-brand-700 tracking-wide uppercase">
                  Trusted by Industry Leaders
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
                Over 50 Years of
                <br />
                <span className="text-brand-600">Manufacturing</span>
                <br />
                Excellence
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                A family-owned business specialising in screen and pad printing solutions for industrial applications.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center sm:items-start">
                <Button href="/contact" size="lg" className="bg-brand-600 hover:bg-brand-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-xl shadow-brand-600/25">
                  Get in Touch
                </Button>
                <Button href="/services" size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold border-2">
                  View Services
                </Button>
              </div>
            </div>

            {/* Visual Element - Decorative Stats/Features */}
            <div className="relative hidden lg:block h-[340px]">
              {/* Ghost/decorative cards in background */}
              <div className="absolute top-6 right-16 w-36 h-28 bg-white/30 rounded-2xl border border-gray-200/40 rotate-6" />
              <div className="absolute top-2 right-44 w-24 h-20 bg-brand-600/5 rounded-xl border border-brand-600/10 -rotate-3" />

              {/* Stat Card 1 - 50+ Years: top-left */}
              <div className="absolute top-0 left-4 w-48 bg-white/80 backdrop-blur-sm border-2 border-brand-600/20 rounded-2xl p-7 hover:shadow-xl transition-[shadow,transform] duration-300 group -rotate-1 hover:rotate-0 hover:-translate-y-1">
                <div className="text-5xl font-bold text-brand-600 mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-sm font-semibold text-gray-700">Years Experience</div>
              </div>

              {/* Stat Card 2 - Bespoke: top-right, overlapping */}
              <div className="absolute top-10 left-[220px] w-42 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-[shadow,transform] duration-300 group rotate-2 hover:rotate-0 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-10 h-10 text-gray-900 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-700">Bespoke Solutions</div>
              </div>

              {/* Stat Card 3 - UK: bottom-left, blue */}
              <div className="absolute bottom-0 left-0 w-48 bg-gradient-to-br from-brand-600 to-brand-700 border-2 border-brand-700 rounded-2xl p-7 hover:shadow-2xl transition-[shadow,transform] duration-300 text-white group rotate-1 hover:rotate-0 hover:-translate-y-1">
                <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">UK</div>
                <div className="text-sm font-semibold text-white/90">Based & Proud</div>
              </div>

              {/* Stat Card 4 - Quality: bottom-right, close to UK card */}
              <div className="absolute bottom-6 left-[210px] w-42 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-[shadow,transform] duration-300 group -rotate-2 hover:rotate-0 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-8 h-8 text-brand-600 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-700">Quality Assured</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section spacing="lg" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />

        <Container>
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-4">
                Our Story
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                About Mascoprint
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                With over 50 years' experience, we are committed to providing a high quality service. Our skilled technicians ensure that every job is done to the highest standard.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                At Mascoprint, we understand the importance of innovation and staying ahead of the curve in an ever-changing world. We pride ourselves on our excellent customer service and work closely with our clients to achieve their desired outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-16">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="font-display text-2xl font-bold mb-2">Lucy Hughes</h3>
                <p className="text-gray-400">Director</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="font-display text-2xl font-bold mb-2">Stuart Wing</h3>
                <p className="text-gray-400">Director</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="font-display text-2xl font-bold mb-2">Ian Mason</h3>
                <p className="text-gray-400">Director</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="font-display text-2xl font-bold mb-2">Yvonne Mason</h3>
                <p className="text-gray-400">Director</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Overview */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-4">
              What We Do
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div key={service.title} className="group relative">
                <div className="absolute -top-4 -left-4 text-8xl font-bold text-brand-600/10 leading-none" aria-hidden="true">
                  {service.number}
                </div>
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-600 transition-[border-color,shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]">
                  <h3 className="font-display text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href="/services" variant="outline" size="lg" className="border-2">
              View All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* Sectors We Serve */}
      <Section spacing="lg" className="bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-4">
              Industries
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sectors We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center hover:border-brand-600 transition-[border-color,shadow,transform] duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]">
                  <p className="font-display font-bold text-lg">{sector}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href="/case-studies" variant="outline" size="lg" className="border-2">
              View Case Studies
            </Button>
          </div>
        </Container>
      </Section>

      {/* Training & Consultancy */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-4">
              Expertise
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Training & Consultancy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our wealth of experience can help advise you with the best solutions for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 hover:border-brand-600 transition-colors">
              <div className="w-16 h-16 bg-brand-600/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold mb-6">Consultancy Services</h3>
              <ul className="space-y-3">
                {consultancyServices.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-700 border-2 border-brand-700 rounded-2xl p-10 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold mb-6">Training Programs</h3>
              <ul className="space-y-3">
                {trainingPrograms.map((program) => (
                  <li key={program} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0" />
                    <span className="text-white/95">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Distribution Partners */}
      <Section spacing="lg" className="bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-4">
              Partnerships
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Distribution Partners
            </h2>
          </div>

          <DynamicPartnerLogos />

          <div className="text-center mt-12">
            <Button href="/distribution-partners" variant="outline" size="lg">
              View All Partners
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-12 py-16 sm:py-20 text-center">
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Contact us today to discuss your printing requirements and discover how we can help.
              </p>
              <Button href="/contact" size="lg" className="bg-brand-600 hover:bg-brand-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-xl shadow-brand-600/25">
                Contact Us Today
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
