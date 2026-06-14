import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Millog() {
  return (
    <div className="bg-bg-base text-text-primary min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Product</p>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Millog</h1>
        <p className="text-text-muted text-lg max-w-md mb-8">
          포트폴리오 페이지 준비 중입니다.
        </p>
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <span className="text-xs bg-bg-surface border border-border-subtle text-text-muted rounded-full px-3 py-1">베타 출시</span>
          <span className="text-xs bg-bg-surface border border-border-subtle text-text-muted rounded-full px-3 py-1">사용자 인터뷰 완료</span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent-bright border border-accent/30 rounded-lg px-6 py-3 hover:bg-accent/10 transition-colors"
        >
          ← AllDayProject로 돌아가기
        </Link>
      </div>
      <Footer showProductsLink />
    </div>
  )
}
