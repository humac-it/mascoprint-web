import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { sendContactEmail } from '@/lib/email'

interface ContactRequestBody {
  name: string
  email: string
  phone?: string
  message: string
  turnstileToken: string
  website?: string
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse body
    const body: ContactRequestBody = await request.json()
    const { name, email, phone, message, turnstileToken, website } = body

    // 2. Honeypot check — return fake success to not tip off bots
    if (website) {
      return NextResponse.json({ success: true })
    }

    // 3. Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Message is required and must be at least 10 characters.' },
        { status: 400 }
      )
    }

    // 4. Turnstile verification
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Please complete the CAPTCHA verification.' },
        { status: 400 }
      )
    }

    const turnstileValid = await verifyTurnstileToken(turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // 5. Send email
    const result = await sendContactEmail({
      name,
      email,
      phone: phone || undefined,
      message,
    })

    if (!result.success) {
      console.error('Email send failed:', result.error)
      return NextResponse.json(
        { error: `Failed to send message: ${result.error || 'Unknown error'}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
