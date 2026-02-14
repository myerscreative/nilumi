
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  // Edge functions received a JSON body for Database Webhooks
  const { record } = await req.json()

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nilumi Leads <onboarding@resend.dev>',
      to: ['rob@myers.xyz'], // Adjust this if you want it sent elsewhere
      subject: `New Lead: ${record.first_name} ${record.last_name} (${record.company})`,
      html: `
        <div style="font-family: sans-serif; color: #0F172A;">
          <h1 style="color: #2BB673;">New Partnership Inquiry</h1>
          <hr />
          <p><strong>Name:</strong> ${record.first_name} ${record.last_name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Company:</strong> ${record.company}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #F8FAFC; padding: 15px; border-radius: 8px;">
            ${record.licensing_interest}
          </div>
          <p style="font-size: 10px; color: #94A3B8; margin-top: 20px;">
            This lead was captured at ${record.captured_at}
          </p>
        </div>
      `
    })

    if (error) throw error;

    return new Response(JSON.stringify(data), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    })
  }
})
