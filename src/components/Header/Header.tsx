import { useCallback, useEffect, useState } from 'react'
import logo from '../../assets/logo/emcee_it.png'
import HeaderNavLink from './HeaderNavLink'
import styles from './Header.module.css'

const NAV_ITEMS = [
  // { label: 'Home', href: '/' },
  { label: 'AI Solutions', href: '/ai-solutions' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Whitelabel', href: '/whitelabel' },
  { label: 'Gov Contracting', href: '/gov-contracting' },
] as const

const CTA_HREF = '/estimate'

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    const syncPath = () => {
      setActivePath(window.location.pathname)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('popstate', syncPath)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', syncPath)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
  }

  const handleNavClick = (href: string) => {
    setActivePath(href)
    closeMenu()
  }

  const headerClassName = [styles.header, isScrolled ? styles.scrolled : '']
    .filter(Boolean)
    .join(' ')

  const mobileMenuClassName = [styles.mobileMenu, isMenuOpen ? styles.mobileMenuOpen : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClassName}>
      <div className={styles.container}>
        <a href="/" className={styles.logoLink} aria-label="Emcee IT Solutions - Home">
          <img src={logo} alt="Emcee IT Solutions" className={styles.logo} />
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <HeaderNavLink
                  href={item.href}
                  isActive={isActivePath(activePath, item.href)}
                >
                  {item.label}
                </HeaderNavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href={CTA_HREF} className={styles.cta}>
          Start Your Estimate
        </a>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>

      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        id="mobile-navigation"
        className={mobileMenuClassName}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.mobileNavList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <HeaderNavLink
                href={item.href}
                isActive={isActivePath(activePath, item.href)}
                variant="mobile"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </HeaderNavLink>
            </li>
          ))}
        </ul>

        <a href={CTA_HREF} className={styles.mobileCta} onClick={closeMenu}>
          Start Your Estimate
        </a>
      </nav>
    </header>
  )
}
