import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Industrial printing equipment and supplies from Mascoprint. Including CP12 cylindrical printers, Tampograf pad printers, screen printing equipment, and specialist inks.',
  openGraph: {
    title: 'Products - Mascoprint',
    description: 'Industrial printing equipment including cylindrical printers, pad printers, and specialist inks.',
    url: 'https://mascoprint.co.uk/products',
    siteName: 'Mascoprint',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: 'Products - Mascoprint',
    description: 'Industrial printing equipment and specialist inks.',
  },
  alternates: {
    canonical: 'https://mascoprint.co.uk/products',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://mascoprint.co.uk' },
        { name: 'Products', url: 'https://mascoprint.co.uk/products' },
      ]} />
      {children}
    </>
  )
}
