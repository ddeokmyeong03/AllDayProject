import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-base/90 backdrop-blur-md border-b border-border-subtle' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-text-primary font-bold text-lg tracking-tight hover:text-accent-bright transition-colors"
        >
          AllDayProject
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href={isHome ? '#products' : '/#products'}
            className="text-text-muted hover:text-text-primary text-sm transition-colors"
          >
            Products
          </a>
          <a
            href={isHome ? '#team' : '/#team'}
            className="text-text-muted hover:text-text-primary text-sm transition-colors"
          >
            Team
          </a>
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="text-text-muted hover:text-text-primary text-sm transition-colors"
          >
            Contact
          </a>
          <Link
            to="/mosaic-guard"
            className="text-accent-bright border border-accent/40 rounded px-4 py-1.5 text-sm hover:bg-accent/10 transition-all"
          >
            MOSAIC-Guard →
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden text-text-muted hover:text-text-primary p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <div className="md:hidden bg-bg-surface border-b border-border-subtle px-6 py-4 flex flex-col gap-4">
          <a href={isHome ? '#products' : '/#products'} className="text-text-muted text-sm">Products</a>
          <a href={isHome ? '#team' : '/#team'} className="text-text-muted text-sm">Team</a>
          <a href={isHome ? '#contact' : '/#contact'} className="text-text-muted text-sm">Contact</a>
          <Link to="/mosaic-guard" className="text-accent-bright text-sm font-medium">MOSAIC-Guard →</Link>
        </div>
      )}
    </header>
  )
}
