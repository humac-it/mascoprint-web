'use client'

import { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { trackEvent } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  website: string
}

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const onTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('idle')
    setErrorMessage('')

    if (!turnstileToken) {
      setSubmitStatus('error')
      setErrorMessage('Please complete the verification check.')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          website: data.website,
          turnstileToken,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        let errorMsg = 'Failed to send message. Please try again or contact us directly.'
        try {
          const result = JSON.parse(text)
          if (result.error) errorMsg = result.error
        } catch {
          // Non-JSON response (e.g. 500 from server)
        }
        throw new Error(errorMsg)
      }

      const result = await response.json()

      setSubmitStatus('success')
      reset()
      setTurnstileToken(null)
      turnstileRef.current?.reset()

      trackEvent('submit', 'form', 'contact_form_success')
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      )

      setTurnstileToken(null)
      turnstileRef.current?.reset()

      trackEvent('error', 'form', 'contact_form_error')
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 md:p-12 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Send us a message
          </h2>
          <div className="h-1 w-16 bg-brand-600 rounded-full" />
        </div>

        {/* Status Messages */}
        <div aria-live="polite" role="status">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-600/20 border-2 border-green-500/50 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white font-semibold">Message sent successfully!</p>
                  <p className="text-white/80 text-sm mt-1">We&apos;ll get back to you as soon as possible.</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-600/20 border-2 border-red-500/50 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white font-semibold">Failed to send message</p>
                  <p className="text-white/80 text-sm mt-1">
                    {errorMessage || 'Please try again or contact us directly via email.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field — hidden from users, catches bots */}
          <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              autoComplete="off"
              tabIndex={-1}
              {...register('website')}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
              className={`w-full px-4 py-3 bg-white/10 border-2 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-600 transition-all backdrop-blur-sm ${
                errors.name ? 'border-red-500/50' : 'border-white/20 focus:border-brand-600'
              }`}
              placeholder="Your name"
              disabled={isSubmitting}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              className={`w-full px-4 py-3 bg-white/10 border-2 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-600 transition-all backdrop-blur-sm ${
                errors.email ? 'border-red-500/50' : 'border-white/20 focus:border-brand-600'
              }`}
              placeholder="your@email.com"
              disabled={isSubmitting}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all backdrop-blur-sm"
              placeholder="+44 (0)1234 567890"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
              })}
              className={`w-full px-4 py-3 bg-white/10 border-2 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-600 transition-all backdrop-blur-sm resize-none ${
                errors.message ? 'border-red-500/50' : 'border-white/20 focus:border-brand-600'
              }`}
              placeholder="Tell us about your project..."
              disabled={isSubmitting}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* Cloudflare Turnstile */}
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={onTurnstileSuccess}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
              options={{
                theme: 'dark',
                size: 'normal',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-xl shadow-brand-600/25 hover:shadow-2xl hover:shadow-brand-600/30 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
