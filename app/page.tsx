'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background pointer-events-none" />

      {/* Geometric Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 border border-primary/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 border border-primary/10 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Vertical line accent */}
      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-linear-to-b from-primary/0 via-primary/20 to-primary/0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Main Heading */}
          <h1
            className={`heading-xl text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            AUth Next
          </h1>

          {/* Subtitle */}
          <p
            className={`subtitle max-w-2xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.4s' }}
          >
            Better auth authentication applied in your Next.js project
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center pt-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <Link
              href="/auth/sign-in"
              className="btn-primary inline-block font-mono uppercase tracking-wide"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="btn-secondary inline-block font-mono uppercase tracking-wide"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Built by{' '}
          <a href="https://abirbhabdasgupta.vercel.app" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4">
            Abirbhab Dasgupta
          </a>
        </p>
      </div>
    </main >
  )
}