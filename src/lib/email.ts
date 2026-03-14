import { Resend } from 'resend'
import { CONTACT } from '@/config/contact'
import { getCloudflareContext } from '@opennextjs/cloudflare'

async function getEnvVar(name: string): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true })
    return (env as Record<string, string>)[name] ?? process.env[name]
  } catch {
    return process.env[name]
  }
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildContactEmailHtml(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#0f172a; padding:32px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700;">
                New Contact Form Submission
              </h1>
              <p style="color:#94a3b8; margin:8px 0 0; font-size:14px;">
                mascoprint.co.uk
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#374151; font-size:14px;">Name</strong>
                    <p style="margin:4px 0 0; color:#111827; font-size:16px;">${escapeHtml(data.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#374151; font-size:14px;">Email</strong>
                    <p style="margin:4px 0 0; color:#111827; font-size:16px;">
                      <a href="mailto:${escapeHtml(data.email)}" style="color:#0284c7;">${escapeHtml(data.email)}</a>
                    </p>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#374151; font-size:14px;">Phone</strong>
                    <p style="margin:4px 0 0; color:#111827; font-size:16px;">
                      <a href="tel:${escapeHtml(data.phone)}" style="color:#0284c7;">${escapeHtml(data.phone)}</a>
                    </p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding:12px 0;">
                    <strong style="color:#374151; font-size:14px;">Message</strong>
                    <p style="margin:4px 0 0; color:#111827; font-size:16px; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb; padding:16px 32px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                Sent from the contact form at mascoprint.co.uk
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const to = (await getEnvVar('CONTACT_EMAIL_TO')) || CONTACT.email
  const apiKey = await getEnvVar('RESEND_API_KEY')
  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from: 'Mascoprint Website <no-reply@mascoprint.co.uk>',
      to: [to],
      replyTo: data.email,
      subject: `New enquiry from ${data.name}`,
      html: buildContactEmailHtml(data),
    })

    if (error) {
      console.error('Resend API error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Failed to send email:', err)
    const errMsg = err instanceof Error ? err.message : String(err)
    return { success: false, error: errMsg }
  }
}
