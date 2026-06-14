import { useEffect, useRef, useState } from 'react'
import Footer from '../../components/Footer'
import { mosaicMetrics } from '../../data/metrics'

// 스크롤 페이드인
function useFadeIn(threshold = 0.1) {
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
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

// 고정 통계 카드
function StatCard({ value, label, note }: { value: string; label: string; note?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px)'
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          ob.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-accent-bright tabular-nums leading-none">{value}</div>
      <div className="text-text-muted text-sm mt-2 leading-snug max-w-[130px] mx-auto">{label}</div>
      {note && (
        <span className="inline-block mt-1 text-xs bg-bg-elevated text-text-muted/70 border border-border-subtle rounded px-2 py-0.5">
          【TODO: 실측값 입력】
        </span>
      )}
    </div>
  )
}

// 집적위험 다이어그램 (safe→danger 색전환 애니메이션)
function EscalationDiagram() {
  const [activated, setActivated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setActivated(true), 800)
          ob.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  const docs = [
    { label: '문서 A', desc: '부대명' },
    { label: '문서 B', desc: '위치' },
    { label: '문서 C', desc: '시간' },
    { label: '문서 D', desc: '규모' },
  ]

  return (
    <div ref={ref} className="w-full">
      {/* 데스크톱: 가로 배치 */}
      <div className="hidden md:flex items-center gap-3 justify-center">
        {docs.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="bg-safe-dark/20 border border-safe-dark text-accent-bright text-sm rounded-lg px-4 py-3 text-center w-28 transition-all duration-500">
              <div className="font-semibold text-accent-bright">{d.label}</div>
              <div className="text-text-muted text-xs mt-0.5">{d.desc}</div>
              <div className="text-safe-dark text-xs font-medium mt-1">안전</div>
            </div>
            {i < docs.length - 1 && (
              <div className="rotate-0" style={{ position: 'absolute', display: 'none' }} />
            )}
          </div>
        ))}
        {/* 화살표 */}
        <div className="flex flex-col items-center gap-1 mx-2">
          <div className="text-text-muted text-xs text-center w-20">AI 결합·요약</div>
          <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        {/* 결과 */}
        <div
          className={`border rounded-lg px-5 py-4 text-center w-36 transition-all duration-700 ${
            activated
              ? 'border-danger bg-danger/15 text-danger'
              : 'border-accent/30 bg-accent/5 text-accent-bright'
          }`}
        >
          <div className="font-bold text-sm">산출물</div>
          <div className="text-xs mt-0.5 opacity-80">부대 이동 정보</div>
          <div className={`text-xs font-semibold mt-2 transition-colors duration-700 ${activated ? 'text-danger' : 'text-accent'}`}>
            {activated ? '⚠ 위험 격상' : '분석 중…'}
          </div>
        </div>
      </div>

      {/* 모바일: 세로 스택 */}
      <div className="md:hidden flex flex-col items-center gap-3">
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {docs.map((d, i) => (
            <div key={i} className="bg-safe-dark/20 border border-safe-dark rounded-lg px-3 py-3 text-center">
              <div className="font-semibold text-accent-bright text-sm">{d.label}</div>
              <div className="text-text-muted text-xs">{d.desc}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center text-text-muted text-xs gap-1">
          <span>AI 결합·요약</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
        <div
          className={`border rounded-lg px-6 py-4 text-center w-full max-w-xs transition-all duration-700 ${
            activated ? 'border-danger bg-danger/15' : 'border-accent/30 bg-accent/5'
          }`}
        >
          <div className={`font-bold transition-colors duration-700 ${activated ? 'text-danger' : 'text-accent-bright'}`}>
            {activated ? '⚠ 위험 격상' : '산출물'}
          </div>
          <div className="text-text-muted text-sm mt-0.5">부대 이동 정보</div>
        </div>
      </div>

      <p className="text-center text-text-muted/60 text-xs mt-4">※ 예시는 가상 데이터입니다</p>
    </div>
  )
}

// 결정론 vs 확률 비교 다이어그램
function DeterminismDiagram() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 결정론적 */}
      <div className="bg-bg-elevated border border-accent/20 rounded-xl p-6">
        <div className="text-accent-bright font-semibold mb-4 text-sm uppercase tracking-wide">규칙 기반 (결정론)</div>
        <div className="flex flex-col gap-2">
          {['입력 A → 결과 X', '입력 A → 결과 X', '입력 A → 결과 X'].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-text-muted">{s.split('→')[0]}→</span>
              <span className="text-accent-bright font-medium">{s.split('→')[1]}</span>
              <span className="ml-auto text-accent text-xs">✓ 동일</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-text-muted text-xs leading-relaxed border-t border-border-subtle pt-3">
          같은 입력 → 항상 같은 결과 → 사후 감사 가능
        </div>
      </div>

      {/* 확률적 */}
      <div className="bg-bg-elevated border border-border-subtle rounded-xl p-6 opacity-70">
        <div className="text-text-muted font-semibold mb-4 text-sm uppercase tracking-wide">LLM 추론 (확률)</div>
        <div className="flex flex-col gap-2">
          {[
            { input: '입력 A', output: '결과 X', conf: '72%' },
            { input: '입력 A', output: '결과 Y', conf: '68%' },
            { input: '입력 A', output: '결과 X', conf: '81%' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-text-muted">{s.input} →</span>
              <span className="text-text-muted">{s.output}</span>
              <span className="ml-auto text-text-muted/60 text-xs">확률 {s.conf}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-text-muted text-xs leading-relaxed border-t border-border-subtle pt-3">
          같은 입력 → 다른 결과 → 사후 감사 불가
        </div>
      </div>
    </div>
  )
}

// 작동 파이프라인 다이어그램
function PipelineDiagram() {
  const steps = [
    { num: '01', title: '요소 추출·분류', desc: '문서에서 식별 요소 추출 및 위험 분류' },
    { num: '02', title: '집적위험 판정', desc: '결정론적 룰셋으로 조합 위험도 계산' },
    { num: '03', title: '역추적 + 출구 제시', desc: '위험 원인 출처 역추적 및 수정 경로 제안' },
    { num: '04', title: '해시체인 증적', desc: '검수 이력을 위변조 불가 체인으로 기록' },
  ]
  return (
    <div className="relative">
      {/* 데스크톱 */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <div key={i} className="relative flex flex-col">
            <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 flex flex-col gap-2 h-full hover:border-accent/30 transition-colors">
              <div className="text-accent font-mono text-xs font-bold">{s.num}</div>
              <div className="text-text-primary font-semibold text-sm">{s.title}</div>
              <div className="text-text-muted text-xs leading-relaxed">{s.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10">
                <svg className="w-5 h-5 text-accent/50" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* 모바일 */}
      <div className="md:hidden flex flex-col gap-3">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 bg-bg-surface border border-border-subtle rounded-xl p-4">
            <div className="text-accent font-mono text-sm font-bold shrink-0 w-8">{s.num}</div>
            <div>
              <div className="text-text-primary font-semibold text-sm">{s.title}</div>
              <div className="text-text-muted text-xs mt-1">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// UI 목업 컴포넌트
function DemoMockup() {
  const highlighted = '부대 이동 관련 정보가 문서 A·B·C의 결합으로 생성되었습니다.'
  return (
    <div className="bg-bg-elevated border border-border-subtle rounded-xl overflow-hidden">
      <div className="bg-bg-surface border-b border-border-subtle px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-danger/50" />
        <div className="w-3 h-3 rounded-full bg-accent/30" />
        <div className="w-3 h-3 rounded-full bg-text-muted/20" />
        <span className="text-text-muted text-xs ml-2">MOSAIC-Guard 검수 결과 — 가상 데이터</span>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
        {/* 좌: 위험 문장 */}
        <div className="p-5">
          <div className="text-text-muted text-xs uppercase tracking-wide mb-3">산출물 (AI 생성)</div>
          <p className="text-sm leading-relaxed text-text-primary">
            다음 주 훈련 일정에 따라{' '}
            <mark className="bg-danger/20 text-danger px-0.5 rounded not-italic">
              {highlighted}
            </mark>{' '}
            검토 요망.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-danger/15 text-danger border border-danger/30 rounded text-xs px-2 py-0.5">집적위험 감지</span>
            <span className="text-text-muted text-xs">규칙 ID: AGG-0042</span>
          </div>
        </div>
        {/* 우: 원문 역추적 */}
        <div className="p-5">
          <div className="text-text-muted text-xs uppercase tracking-wide mb-3">원문 역추적</div>
          <div className="flex flex-col gap-2">
            {['문서 A — 부대명 언급', '문서 B — 위치 정보', '문서 C — 시간 정보'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-4 h-4 rounded-full bg-safe-dark flex items-center justify-center text-accent-bright shrink-0 font-bold">{i + 1}</span>
                <span className="text-text-muted">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-text-muted text-xs">출구 제시: 해당 문장 삭제 또는 일반화 권고</div>
        </div>
      </div>
    </div>
  )
}

export default function MosaicGuard() {
  const heroRef = useRef<HTMLElement>(null)
  const problemRef = useFadeIn()
  const whyRuleRef = useFadeIn()
  const solutionRef = useFadeIn()
  const diffRef = useFadeIn()
  const evidenceRef = useFadeIn()
  const vocRef = useFadeIn()
  const formRef = useFadeIn()

  // 폼 상태
  const [form, setForm] = useState({
    type: 'PoC',
    email: '',
    org: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!form.email) return
    const subject = `[MOSAIC-Guard ${form.type}] ${form.org}`
    const body = `문의유형: ${form.type}\n소속: ${form.org}\n이메일: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:jdm031021@koreatech.ac.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  const comparisonRows = [
    {
      항목: '통제 대상',
      전통: '패턴/키워드',
      llm: '입력 프롬프트 공격',
      mosaic: '결합 집적위험 · 절차 무결성',
    },
    {
      항목: '모자이크 효과',
      전통: '대응 불가',
      llm: '제한적',
      mosaic: '정면 대응',
    },
    {
      항목: '책임 소명',
      전통: '차단 로그',
      llm: '차단 알람',
      mosaic: '해시체인 증적 · 인증서',
    },
  ]

  return (
    <div className="bg-bg-base text-text-primary min-h-screen">

      {/* ── 블록 1: Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          poster="/hero-poster.png"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          aria-hidden="true"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 md:hidden"
          style={{ backgroundImage: 'url(/hero-poster.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-bg-base/75 md:bg-[rgba(0,9,5,0.6)]" aria-hidden="true" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          {/* 배지 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs bg-bg-surface border border-accent/30 text-accent-bright rounded-full px-3 py-1">국방창업경진대회 진행 중</span>
            <span className="text-xs bg-bg-surface border border-accent/30 text-accent-bright rounded-full px-3 py-1">특허 출원 완료 · 10-2026-0108101</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {['ON-PREMISE', 'RULE-BASED', 'TAMPER-EVIDENT'].map(tag => (
              <span key={tag} className="text-xs font-mono text-text-muted border border-border-subtle rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <div className="max-w-2xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-tight text-text-primary mb-5">
              개별로는 안전한 정보,<br />
              합쳐지면 기밀이 됩니다.
            </h1>
            <p className="text-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              AI가 만든 문서의 집적 위험을 탐지하고, 검수 절차를 위변조 없이 증적화합니다.
              판정은 규칙이, 결재는 사람이.
            </p>

            {/* 통계 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              <StatCard value={mosaicMetrics.reviewTimeReduction} label="검수 시간 절감" note />
              <StatCard value={mosaicMetrics.processingTime} label="문서 검수 처리 시간" note />
              <StatCard value={mosaicMetrics.onPremise} label="완전 온프레미스 (외부 연동 0)" />
              <StatCard value={mosaicMetrics.rulesetCount} label="집적위험 룰셋 규칙 수" note />
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent text-bg-base font-semibold px-6 py-3 rounded hover:bg-accent-bright transition-colors"
              >
                데모/도입 문의 →
              </a>
              <a
                href="#solution"
                className="inline-flex items-center gap-2 border border-accent/40 text-accent-bright px-6 py-3 rounded hover:bg-accent/10 transition-colors"
              >
                어떻게 작동하나 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 블록 2: 문제 정의 ── */}
      <section className="py-24 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={problemRef as React.RefObject<HTMLDivElement>} className="mb-12 text-center">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Problem</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-4">
              왜 <em className="not-italic text-accent-bright">안전한 문서들</em>이,<br />
              합쳐지면 위험해지는가
            </h2>
            <p className="text-text-muted max-w-lg mx-auto">
              각 문서는 단독으로 무해하지만, AI가 결합·요약하는 순간 기밀에 해당하는 정보가 출현합니다.
            </p>
          </div>

          <EscalationDiagram />

          {/* 보조 통계 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            {[
              { label: '결합 위험 발생 비율', value: '[00]%', note: true },
              { label: '연간 AI 생성 문서량 증가', value: '[00]%', note: true },
              { label: '책임 귀속 불명확 사례', value: '[00]%', note: true },
            ].map((s, i) => (
              <div key={i} className="bg-bg-elevated border border-border-subtle rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent-bright">{s.value}</div>
                <div className="text-text-muted text-sm mt-2">{s.label}</div>
                {s.note && (
                  <span className="inline-block mt-1 text-xs text-text-muted/60 border border-border-subtle rounded px-2 py-0.5">
                    【TODO: 실측값·출처】
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 블록 3: 왜 규칙 기반인가 ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={whyRuleRef as React.RefObject<HTMLDivElement>} className="mb-12">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Why Rule-Based</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-4">
              왜 <em className="not-italic text-accent-bright">AI 추론</em>이 아니라{' '}
              <em className="not-italic text-accent-bright">규칙</em>으로 판정하는가
            </h2>
            <p className="text-text-muted max-w-xl">
              면책 증적에는 '재현 가능성'이 필수입니다. 그래서 결정론적 규칙을 택했습니다.
            </p>
          </div>

          {/* 3개 장벽 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: '01',
                title: '재현성',
                body: '확률적 AI 판정은 같은 입력에도 흔들려 사후 감사가 불가능합니다.',
              },
              {
                num: '02',
                title: '설명가능성',
                body: '"왜 위험한가"를 규칙 ID로 추적·제시할 수 있습니다.',
              },
              {
                num: '03',
                title: '책임소명',
                body: '결정론적 판정만이 \'적법 절차 이행\'을 입증하는 증적이 됩니다.',
              },
            ].map((c, i) => (
              <div key={i} className="bg-bg-surface border border-border-subtle rounded-xl p-6 hover:border-accent/30 transition-colors">
                <div className="text-accent font-mono text-xs font-bold mb-3">{c.num}</div>
                <h3 className="text-text-primary font-bold text-lg mb-2">{c.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          {/* 결론 박스 */}
          <div className="bg-bg-surface border border-accent/25 rounded-xl p-8 text-center">
            <p className="text-text-primary text-lg font-medium leading-relaxed">
              AI가 판정하지 않습니다.<br />
              <em className="not-italic text-accent-bright font-bold">규칙이 환기하고, 사람이 결정합니다.</em>
            </p>
          </div>

          <div className="mt-10">
            <DeterminismDiagram />
          </div>
        </div>
      </section>

      {/* ── 블록 4: 솔루션 / 작동 ── */}
      <section id="solution" className="py-24 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={solutionRef as React.RefObject<HTMLDivElement>} className="mb-12">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">How It Works</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-4">
              MOSAIC-Guard는 이렇게 작동합니다
            </h2>
          </div>

          <PipelineDiagram />

          <div className="mt-12">
            <div className="text-text-muted text-sm mb-4">검수 결과 화면 (가상 데이터)</div>
            <DemoMockup />
            <p className="text-text-muted text-xs mt-3 text-center">
              【TODO: 엔진 데모 완성 후 실제 스크린샷·영상으로 교체】
            </p>
          </div>
        </div>
      </section>

      {/* ── 블록 5: 차별점 ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={diffRef as React.RefObject<HTMLDivElement>} className="mb-12">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Differentiation</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary">
              기존 보안 솔루션과 무엇이 다른가
            </h2>
          </div>

          {/* 데스크톱 비교표 */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-border-subtle">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-surface border-b border-border-subtle">
                  <th className="px-6 py-4 text-left text-text-muted font-medium">구분</th>
                  <th className="px-6 py-4 text-center text-text-muted font-medium">전통 보안/DLP</th>
                  <th className="px-6 py-4 text-center text-text-muted font-medium">LLM 가드레일</th>
                  <th className="px-6 py-4 text-center text-accent-bright font-semibold bg-accent/5 border-l border-accent/20">
                    MOSAIC-Guard
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border-subtle last:border-b-0 ${i % 2 === 0 ? 'bg-bg-base' : 'bg-bg-surface/50'}`}
                  >
                    <td className="px-6 py-4 text-text-primary font-medium">{row.항목}</td>
                    <td className="px-6 py-4 text-text-muted text-center">{row.전통}</td>
                    <td className="px-6 py-4 text-text-muted text-center">{row.llm}</td>
                    <td className="px-6 py-4 text-accent-bright font-medium text-center bg-accent/5 border-l border-accent/20">
                      {row.mosaic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <div className="md:hidden flex flex-col gap-4">
            {comparisonRows.map((row, i) => (
              <div key={i} className="bg-bg-surface border border-border-subtle rounded-xl p-5">
                <div className="text-text-primary font-semibold mb-3">{row.항목}</div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>전통 보안/DLP</span><span>{row.전통}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>LLM 가드레일</span><span>{row.llm}</span>
                  </div>
                  <div className="flex justify-between font-medium text-accent-bright border-t border-border-subtle pt-2 mt-1">
                    <span>MOSAIC-Guard</span><span>{row.mosaic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 블록 6: 증적 / 면책 ── */}
      <section className="py-24 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={evidenceRef as React.RefObject<HTMLDivElement>} className="mb-12">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Tamper-Evident</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-4">
              검수했다는 사실을,<br />위변조 없이 증명합니다
            </h2>
            <p className="text-text-muted max-w-lg">
              면책을 보장하는 것이 아닙니다. 적법 절차 이행을 입증하는 증적을 생성합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔗',
                title: '비가역 해시체인',
                body: '각 검수 이벤트가 이전 이벤트와 암호학적으로 연결되어 사후 수정이 불가능합니다.',
              },
              {
                icon: '📋',
                title: '검수 인증서 자동 발급',
                body: '검수 완료 시 규칙 ID·타임스탬프·결과가 담긴 인증서를 즉시 생성합니다.',
              },
              {
                icon: '🚪',
                title: '유통 게이트 연동',
                body: '인증서 없는 문서는 다음 단계로 진행 불가. 절차 준수를 구조적으로 강제합니다.',
              },
            ].map((c, i) => (
              <div key={i} className="bg-bg-elevated border border-border-subtle rounded-xl p-6 hover:border-accent/25 transition-colors">
                <div className="text-2xl mb-4">{c.icon}</div>
                <h3 className="text-text-primary font-bold mb-2">{c.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 블록 7: 실증 / VoC ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={vocRef as React.RefObject<HTMLDivElement>} className="mb-12">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Validation</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary">
              현장에서 확인했습니다
            </h2>
          </div>

          {/* 실증 숫자 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {[
              { value: '[00]%', label: '검수 시간 절감', note: true },
              { value: '[00]ms', label: '문서 처리 속도', note: true },
              { value: '[00]%', label: '합성셋 탐지율', note: true },
              { value: '[00]+', label: '룰셋 규칙 수', note: true },
            ].map((s, i) => (
              <div key={i} className="bg-bg-surface border border-border-subtle rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-accent-bright">{s.value}</div>
                <div className="text-text-muted text-sm mt-2">{s.label}</div>
                <span className="inline-block mt-1 text-xs text-text-muted/60 border border-border-subtle rounded px-2 py-0.5">
                  【TODO: 실측값 입력】
                </span>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-xs text-center -mt-8 mb-14">
            탐지율은 통제된 합성 시나리오 기준 (보안상 실제 기밀 미사용)
          </p>

          {/* VoC */}
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-8 max-w-2xl mx-auto">
            <div className="text-text-muted text-3xl mb-4 leading-none">&ldquo;</div>
            <p className="text-text-primary text-base leading-relaxed italic mb-6">
              【TODO: VoC 인용 최종 문구 — 익명·각색본 입력 필요】
            </p>
            <div className="text-text-muted text-sm border-t border-border-subtle pt-4">
              — 현직 군 정보 실무자 (익명 / 소속·부대 비공개)
            </div>
          </div>
        </div>
      </section>

      {/* ── 블록 8: 폼 ── */}
      <section id="contact" className="py-24 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-2xl mx-auto px-6">
          <div ref={formRef as React.RefObject<HTMLDivElement>} className="mb-10">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-text-primary mb-3">
              도입·협력을 문의하세요
            </h2>
            <p className="text-text-muted">모든 처리는 도입 기관 인프라 내에서만 이루어집니다.</p>
          </div>

          {submitted ? (
            <div className="bg-bg-elevated border border-accent/30 rounded-xl p-8 text-center">
              <div className="text-accent-bright text-2xl mb-2">✓</div>
              <p className="text-text-primary font-medium">메일 클라이언트가 열렸습니다.</p>
              <p className="text-text-muted text-sm mt-1">2영업일 내 회신드리겠습니다.</p>
            </div>
          ) : (
            <div className="bg-bg-elevated border border-border-subtle rounded-xl p-8 flex flex-col gap-5">
              <div>
                <label className="block text-text-muted text-sm mb-1.5">문의 유형</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent/50 transition-colors text-sm"
                >
                  {['PoC', '도입 상담', '협력', '기타'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-sm mb-1.5">이메일 *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="hello@example.com"
                  required
                  className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-sm mb-1.5">소속</label>
                <input
                  type="text"
                  value={form.org}
                  onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                  placeholder="기관·회사명"
                  className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-sm mb-1.5">메시지</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="문의 내용을 간략히 작성해주세요."
                  rows={4}
                  className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-accent text-bg-base font-semibold py-3 rounded-lg hover:bg-accent-bright transition-colors"
              >
                문의하기
              </button>
              <p className="text-text-muted text-caption text-center">2영업일 내 회신</p>
            </div>
          )}
        </div>
      </section>

      <Footer showProductsLink />
    </div>
  )
}
