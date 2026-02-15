
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    console.log(`Received manual help request for email: ${email}`)

    if (!email) {
      throw new Error('Email is required')
    }

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

    if (error) {
      console.error('Error sending email via Resend:', error)
      throw error
    }

    console.log(`Manual help request sent successfully for ${email}`)

    return new Response(JSON.stringify({ success: true, data }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  } catch (error: any) {
    console.error('Help request function error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})
