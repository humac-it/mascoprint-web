import { getCloudflareContext } from '@opennextjs/cloudflare'

interface TurnstileVerifyResponse {
  success: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const { env } = await getCloudflareContext({ async: true })
  const secret = (env as Record<string, string>).TURNSTILE_SECRET_KEY ?? process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured')
    return false
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      }
    )

    const data: TurnstileVerifyResponse = await response.json()
    return data.success
  } catch (error) {
    console.error('Turnstile verification failed:', error)
    return false
  }
}
