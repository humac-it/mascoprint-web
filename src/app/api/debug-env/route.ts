import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const checks: Record<string, string> = {}

  // Check process.env
  checks.RESEND_API_KEY_via_process = process.env.RESEND_API_KEY ? 'SET' : 'MISSING'
  checks.TURNSTILE_SECRET_KEY_via_process = process.env.TURNSTILE_SECRET_KEY ? 'SET' : 'MISSING'
  checks.CONTACT_EMAIL_TO_via_process = process.env.CONTACT_EMAIL_TO ? 'SET' : 'MISSING'

  // Check getCloudflareContext
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    const cfEnv = env as Record<string, string>
    checks.RESEND_API_KEY_via_cf = cfEnv.RESEND_API_KEY ? 'SET' : 'MISSING'
    checks.TURNSTILE_SECRET_KEY_via_cf = cfEnv.TURNSTILE_SECRET_KEY ? 'SET' : 'MISSING'
    checks.CONTACT_EMAIL_TO_via_cf = cfEnv.CONTACT_EMAIL_TO ? 'SET' : 'MISSING'
    checks.cf_context = 'OK'
  } catch (err) {
    checks.cf_context = `ERROR: ${err instanceof Error ? err.message : String(err)}`
  }

  return NextResponse.json(checks)
}
