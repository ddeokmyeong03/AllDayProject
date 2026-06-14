import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { teamMetrics } from '../data/metrics'

// 스크롤 페이드인 훅
function useFadeIn() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// 고정 텍스트 통계
function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px)'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-accent-bright leading-none tabular-nums">
        {value}
      </div>
      <div className="text-text-muted text-sm mt-2 leading-snug max-w-[120px] mx-auto">{label}</div>
    </div>
  )
}

// 팀원 아바타
function TeamMember({
  initial,
  name,
  role,
  school,
}: {
  initial: string
  name: string
  role: string
  school: string
}) {
  const ref = useFadeIn()
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="flex flex-col items-center text-center gap-3"
    >
      <div className="w-16 h-16 rounded-full bg-brand-deep border border-accent/30 flex items-center justify-center text-accent-bright font-bold text-xl select-none">
        {initial}
      </div>
      <div>
        <div className="text-text-primary font-semibold">{name}</div>
        <div className="text-accent text-sm font-medium">{role}</div>
        <div className="text-text-muted text-caption mt-0.5">{school}</div>
      </div>
    </article>
  )
}

export default function TeamLanding() {
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useFadeIn()
  const productsRef = useFadeIn()
  const teamRef = useFadeIn()
  const contactRef = useFadeIn()

  // Hero 카운트업 (숫자가 아닌 것은 고정 표시)
  const stat1 = { value: teamMetrics.millogLaunch, label: 'Millog 웹·앱 베타 출시 + 사용자 인터뷰' }
  const stat2 = { value: teamMetrics.patentFiled, label: 'MOSAIC-Guard 특허 출원번호 확보' }
  const stat3 = { value: teamMetrics.productCount, label: '출시·개발 중 프로덕트' }
  const stat4 = { value: teamMetrics.achievements, label: '수상 / 인터뷰 【TODO: 실측값 입력】' }

  // 연락 폼 상태
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!form.email) return
    const mailto = `mailto:jdm031021@koreatech.ac.kr?subject=${encodeURIComponent('문의: ' + form.name)}&body=${encodeURIComponent(form.message)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <div className="bg-bg-base text-text-primary min-h-screen">
      {/* ── 블록 1: Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 배경 영상 (데스크톱) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.png"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          aria-hidden="true"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* 모바일 정지 배경 */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ backgroundImage: 'url(/hero-poster.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden="true"
        />
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-bg-base/70 md:bg-[rgba(0,9,5,0.55)]" aria-hidden="true" />

        {/* 컨텐츠 */}
        <div ref={heroRef} className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="max-w-2xl">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">
              언제나 도전한다
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-text-primary mb-4">
              빠르게 만들고,<br />
              빠르게 증명한다
            </h1>
            <p className="text-text-muted text-lg leading-relaxed mb-10">
              현장의 문제를 기술로 푸는 팀, AllDayProject
            </p>

            {/* Hero 통계 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
              {[stat1, stat2, stat3, stat4].map((s, i) => (
                <StatCard key={i} value={s.value} label={s.label} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/mosaic-guard"
                className="inline-flex items-center gap-2 bg-accent text-bg-base font-semibold px-6 py-3 rounded hover:bg-accent-bright transition-colors"
              >
                MOSAIC-Guard 보기 →
              </Link>
              <a
                href="#team"
                className="inline-flex items-center gap-2 border border-accent/40 text-accent-bright px-6 py-3 rounded hover:bg-accent/10 transition-colors"
              >
                팀 소개
              </a>
            </div>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/50 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 블록 2: Mission ── */}
      <section className="py-24 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div
            ref={missionRef as React.RefObject<HTMLDivElement>}
          >
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-6">Mission</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-snug text-text-primary mb-6">
              AI가 만든 결과를,<br />
              사람이 안심하고 책임질 수 있게.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto">
              빠른 추진력과 실행력으로 현장의 문제를 기술로 풀어냅니다.<br className="hidden sm:block" />
              한 번 만들고 마는 팀이 아닙니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 블록 3: Products ── */}
      <section id="products" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={productsRef as React.RefObject<HTMLDivElement>}
            className="mb-12"
          >
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-3">Products</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary">우리가 만든 것들</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MOSAIC-Guard 카드 (大) */}
            <article className="md:col-span-2 bg-bg-surface border border-border-subtle rounded-xl p-8 flex flex-col gap-4 hover:bg-bg-elevated hover:border-accent/30 transition-all group">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium bg-accent/15 text-accent-bright border border-accent/25 rounded-full px-3 py-1">진행 중</span>
                <span className="text-xs font-medium bg-brand-deep/40 text-accent border border-brand-deep rounded-full px-3 py-1">특허 출원 완료</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">MOSAIC-Guard</h3>
                <p className="text-text-muted leading-relaxed">
                  AI 생성 문서의 집적 위험을 탐지하고, 검수 절차를 위변조 없이 증적화하는 온프레미스 솔루션
                </p>
              </div>
              <Link
                to="/mosaic-guard"
                className="mt-auto inline-flex items-center gap-1.5 text-accent-bright font-medium group-hover:gap-3 transition-all text-sm"
              >
                자세히 보기 <span aria-hidden>→</span>
              </Link>
            </article>

            {/* Millog 카드 (小) */}
            <article className="bg-bg-surface border border-border-subtle rounded-xl p-8 flex flex-col gap-4 hover:bg-bg-elevated hover:border-accent/20 transition-all group">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium bg-bg-elevated text-text-muted border border-border-subtle rounded-full px-3 py-1">베타 출시</span>
                <span className="text-xs font-medium bg-bg-elevated text-text-muted border border-border-subtle rounded-full px-3 py-1">사용자 인터뷰 완료</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Millog</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  【TODO: Millog 한 줄 설명 — 사용자 작성】
                </p>
              </div>
              <a
                href="https://www.millog.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary font-medium group-hover:gap-3 transition-all text-sm"
              >
                Millog 체험하기 <span aria-hidden>→</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ── 블록 4: Team ── */}
      <section id="team" className="py-24 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={teamRef as React.RefObject<HTMLDivElement>} className="mb-12">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-3">Team</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-3">Team</h2>
            <p className="text-text-muted max-w-xl">
              Millog에서 MOSAIC-Guard로 — 한 번 하고 마는 팀이 아닙니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            <TeamMember initial="진" name="진덕명" role="CEO" school="한국기술교육대" />
            <TeamMember initial="이" name="이재민" role="CPO" school="포항공과대" />
            <TeamMember initial="김" name="김성민" role="CMO" school="아주대" />
            <TeamMember initial="신" name="신현규" role="CDO" school="경희대" />
          </div>

          <p className="text-text-muted text-caption mt-10 text-center">
            전원 현역 복무 중 · 개인 식별정보 비공개
          </p>
        </div>
      </section>

      {/* ── 블록 5: Contact ── */}
      <section id="contact" className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div ref={contactRef as React.RefObject<HTMLDivElement>} className="mb-10">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-3">Contact</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-3">함께하기</h2>
            <p className="text-text-muted">협력·도입 문의는 아래로 남겨주세요.</p>
          </div>

          {submitted ? (
            <div className="bg-bg-surface border border-accent/30 rounded-xl p-8 text-center">
              <div className="text-accent-bright text-2xl mb-2">✓</div>
              <p className="text-text-primary font-medium">메일 클라이언트가 열렸습니다.</p>
              <p className="text-text-muted text-sm mt-1">2영업일 내 회신드리겠습니다.</p>
            </div>
          ) : (
            <div className="bg-bg-surface border border-border-subtle rounded-xl p-8 flex flex-col gap-5">
              <div>
                <label className="block text-text-muted text-sm mb-1.5">이름</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="홍길동"
                  className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-sm mb-1.5">이메일 *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="hello@example.com"
                  required
                  className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-sm mb-1.5">메시지</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="문의 내용을 간략히 작성해주세요."
                  rows={4}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-accent text-bg-base font-semibold py-3 rounded-lg hover:bg-accent-bright transition-colors"
              >
                보내기
              </button>
              <p className="text-text-muted text-caption text-center">2영업일 내 회신</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
