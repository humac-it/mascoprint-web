import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    const checks: Record<string, string> = {}

    checks.RESEND_API_KEY = process.env.RESEND_API_KEY ? 'SET' : 'MISSING'
    checks.TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY ? 'SET' : 'MISSING'
    checks.CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'MISSING'

    return NextResponse.json(checks)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
