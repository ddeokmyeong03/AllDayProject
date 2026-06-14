import { Link } from 'react-router-dom'

interface FooterProps {
  showProductsLink?: boolean
}

export default function Footer({ showProductsLink = false }: FooterProps) {
  return (
    <footer className="bg-bg-surface border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link to="/" className="text-text-primary font-bold text-lg">
              AllDayProject
            </Link>
            <p className="text-text-muted text-caption mt-2 max-w-xs">
              현장의 문제를 기술로 푸는 팀
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 text-sm text-text-muted">
            <div className="flex flex-col gap-2">
              <span className="text-text-primary font-semibold text-caption uppercase tracking-wider">Products</span>
              <Link to="/mosaic-guard" className="hover:text-text-primary transition-colors">MOSAIC-Guard</Link>
              <a href="https://www.millog.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Millog</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-text-primary font-semibold text-caption uppercase tracking-wider">Team</span>
              <a href="/#team" className="hover:text-text-primary transition-colors">팀 소개</a>
              <a href="/#contact" className="hover:text-text-primary transition-colors">Contact</a>
            </div>
            {showProductsLink && (
              <div className="flex flex-col gap-2">
                <span className="text-text-primary font-semibold text-caption uppercase tracking-wider">More</span>
                <Link to="/" className="hover:text-text-primary transition-colors">다른 프로덕트 보기 →</Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-text-muted text-caption">© 2026 AllDayProject. All rights reserved.</p>
          <p className="text-text-muted text-caption">언제나 도전한다</p>
        </div>
      </div>
    </footer>
  )
}
