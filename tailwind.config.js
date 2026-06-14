/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#000905',
        'bg-surface': '#0C1712',
        'bg-elevated': '#13201A',
        'text-primary': '#D8E8DB',
        'text-muted': '#8BBB94',
        'accent': '#8BBB94',
        'accent-bright': '#A9D4B4',
        'brand-deep': '#004225',
        'border-subtle': '#1A2620',
        'danger': '#D90024',
        'safe': '#052E5C',
        'safe-dark': '#1A4D7A',
        'surface-light-bg': '#FEFEFA',
        'surface-light-text': '#004225',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem,6vw,4rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['clamp(1.75rem,3.5vw,2rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
        'stat': ['clamp(2rem,5vw,3rem)', { lineHeight: '1', fontWeight: '800' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'danger-flash': 'dangerFlash 0.8s ease-in forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dangerFlash: {
          '0%': { color: '#8BBB94', backgroundColor: 'rgba(139,187,148,0.1)' },
          '100%': { color: '#D90024', backgroundColor: 'rgba(217,0,36,0.15)' },
        },
      },
    },
  },
  plugins: [],
}
