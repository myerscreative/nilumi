
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  const { email } = await req.json()

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nilumi Auth <onboarding@resend.dev>',
      to: ['rob@myers.xyz'], // Notification for the admin
      subject: `🚨 Auth Assistance Required: ${email}`,
      html: `
        <div style="font-family: sans-serif; color: #0F172A;">
          <h1 style="color: #EF4444;">Manual Reset Required</h1>
          <p>A user is currently locked out of the Nilumi Innovation Portal due to Supabase rate limits.</p>
          <hr />
          <p><strong>User Email:</strong> ${email}</p>
          <p><strong>Action Required:</strong> Please manually provide a reset link or contact the user directly to verify their access.</p>
          <p style="font-size: 10px; color: #94A3B8; margin-top: 20px;">
            This request was generated automatically from the Nilumi Forgot Password portal.
          </p>
        </div>
      `
    })

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      } 
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      } 
    })
  }
})
