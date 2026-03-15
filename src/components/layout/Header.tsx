'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { trackPhoneClick, trackEmailClick } from '@/lib/analytics'
import { CONTACT } from '@/config/contact'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Distribution Partners', href: '/distribution-partners' },
  {
    name: 'Case Studies',
    href: '/case-studies',
    submenu: [
      { name: 'Aerospace', href: '/case-studies/aerospace' },
      { name: 'Automotive', href: '/case-studies/automotive' },
      { name: 'Defence', href: '/case-studies/defence' },
      { name: 'Medical', href: '/case-studies/medical' },
      { name: 'Plastics', href: '/case-studies/plastics' },
      { name: 'Glassware', href: '/case-studies/glassware' },
      { name: 'R&D', href: '/case-studies/r-and-d' },
    ],
  },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null)
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Auto-hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Don't hide if mobile menu is open
      if (mobileMenuOpen) return

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      }
      // Hide header when scrolling down and past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setOpenDesktopDropdown(null) // Close any open dropdowns
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, mobileMenuOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isOutside = Object.values(dropdownRefs.current).every(
        ref => ref && !ref.contains(target)
      )
      if (isOutside) {
        setOpenDesktopDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false)
        setOpenMobileSubmenu(null)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const toggleDesktopDropdown = (name: string) => {
    setOpenDesktopDropdown(openDesktopDropdown === name ? null : name)
  }

  const toggleMobileSubmenu = (name: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === name ? null : name)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/mascoprint-logo-main.png"
              alt="Mascoprint"
              width={310}
              height={103}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => {
                  if (item.submenu) {
                    dropdownRefs.current[item.name] = el
                  }
                }}
              >
                {item.submenu ? (
                  <button
                    onClick={() => toggleDesktopDropdown(item.name)}
                    aria-expanded={openDesktopDropdown === item.name}
                    aria-haspopup="true"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded px-2 py-1"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDesktopDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded px-2 py-1"
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && (
                  <div
                    className={`absolute left-0 mt-2 w-48 transition-all duration-200 ${
                      openDesktopDropdown === item.name
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white shadow-xl rounded-lg border border-gray-200 py-2 overflow-hidden">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          prefetch={true}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                          onClick={() => setOpenDesktopDropdown(null)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            <a
              href={`tel:${CONTACT.phone}`}
              onClick={trackPhoneClick}
              className="text-gray-600 hover:text-primary-600"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={trackEmailClick}
              className="text-gray-600 hover:text-primary-600"
            >
              {CONTACT.email}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-3 -mr-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {/* Hamburger icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden border-t border-gray-200 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-screen opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="py-4 flex flex-col space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      aria-expanded={openMobileSubmenu === item.name}
                      aria-haspopup="true"
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors rounded-lg"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openMobileSubmenu === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`ml-4 overflow-hidden transition-all duration-200 ${
                        openMobileSubmenu === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-1 py-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            prefetch={true}
                            className="block px-4 py-3 text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setOpenMobileSubmenu(null)
                            }}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 font-medium transition-colors rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Contact Info */}
            <div className="border-t border-gray-200 mt-4 pt-4 px-4 space-y-3">
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={trackPhoneClick}
                className="flex items-center gap-3 text-gray-600 hover:text-brand-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                onClick={trackEmailClick}
                className="flex items-center gap-3 text-gray-600 hover:text-brand-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{CONTACT.email}</span>
              </a>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  )
}
