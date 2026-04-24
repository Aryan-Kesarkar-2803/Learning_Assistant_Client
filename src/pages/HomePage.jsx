
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const features = [
  {
    icon: '🧠',
    title: 'Personalized Learning Paths',
    desc: 'AI adapts to your strengths and weaknesses, creating a study plan tailored just for you.',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    icon: '⚡',
    title: 'Interactive Modules',
    desc: 'Learn through quizzes, flashcards, and simulations that make studying engaging and effective.',
    accent: 'from-violet-500 to-purple-500',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'Monitor your growth with detailed analytics and insights to stay motivated and on track.',
    accent: 'from-cyan-500 to-blue-500',
  },
]

const steps = [
  { icon: '📝', step: '01', title: 'Set Your Goals', desc: 'Define what you want to achieve — exams, skills, or career growth.' },
  { icon: '⚡', step: '02', title: 'Get Smart Recommendations', desc: 'Receive AI-powered study plans, resources, and practice exercises.' },
  { icon: '🚀', step: '03', title: 'Track & Improve', desc: 'Measure progress, refine your approach, and achieve your learning goals.' },
]

const HomePage = () => {
  const navigate = useNavigate()
  const [heroVisible, setHeroVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #6366f1, #3b82f6)',
              top: '-10%',
              left: '-10%',
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              transition: 'transform 0.8s ease',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #8b5cf6, #06b6d4)',
              bottom: '0%',
              right: '-5%',
              transform: `translate(${-mousePos.x * 15}px, ${-mousePos.y * 15}px)`,
              transition: 'transform 0.8s ease',
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-20 flex flex-col md:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
              }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                AI-Powered Learning Platform
              </span>
            </div>

            <h1
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s',
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight"
            >
              Learn{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Smarter
                </span>
                <span
                  className="absolute bottom-1 left-0 w-full h-3 opacity-20 rounded"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }}
                />
              </span>
              {', '}
              <br className="hidden md:block" />
              Achieve{' '}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                More
              </span>{' '}
              📚
            </h1>

            <p
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
              }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              Your AI-powered companion that personalizes your learning journey with interactive modules, smart roadmaps, and real-time progress tracking.
            </p>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s',
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button
                onClick={() => navigate('/get-started')}
                className="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30"
                style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #2563eb)' }} />
              </button>

              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </button>
            </div>

            
          </div>

   
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
              transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
            }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 dark:opacity-20 scale-95"
                style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }} />
              <img
                src="learningImage.png"
                alt="Smart Learning"
                className="relative z-10 rounded-3xl w-full max-w-md h-auto max-h-96 object-contain drop-shadow-2xl"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>

     
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white dark:fill-gray-950" preserveAspectRatio="none" style={{ height: '40px' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>


      <section id="features" className="py-24 px-6 md:px-16 bg-white dark:bg-gray-950">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              excel
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Powerful tools designed to make learning efficient, engaging, and measurable.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 120}>
              <div className="group relative p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${f.accent} rounded-3xl`} />
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} text-2xl mb-6 shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                <div className={`mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${f.accent} transition-all duration-500 rounded-full`} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
            How It{' '}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 dark:from-indigo-800 dark:via-purple-800 dark:to-cyan-800" />

          {steps.map((s, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="relative text-center p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-xs font-black flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  {s.step}
                </div>
                <div className="text-4xl mb-4 mt-2 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

   
      <section className="py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50 dark:from-indigo-950 dark:via-blue-950 dark:to-violet-950" />
        <div className="absolute top-8 left-8 w-32 h-32 rounded-full blur-2xl opacity-30 dark:opacity-20"
          style={{ background: '#6366f1' }} />
        <div className="absolute bottom-8 right-8 w-48 h-48 rounded-full blur-3xl opacity-20 dark:opacity-10"
          style={{ background: '#06b6d4' }} />

        <AnimatedSection className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-5xl mb-6 block" style={{ animation: 'float 3s ease-in-out infinite' }}>✨</span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
            Start Your Smart{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Learning Journey
            </span>{' '}
            Today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
            Register today and unlock personalized learning experiences powered by AI. Join thousands of learners already achieving their goals.
          </p>
          <button
            onClick={() => navigate('/get-started')}
            className="group px-10 py-4 rounded-2xl font-black text-white text-lg relative overflow-hidden shadow-2xl shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started Free
              <span className="group-hover:translate-x-1 transition-transform duration-200 text-xl">→</span>
            </span>
          </button>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">No credit card required · Free forever plan</p>
        </AnimatedSection>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
      `}</style>
    </div>
  )
}

export default HomePage

