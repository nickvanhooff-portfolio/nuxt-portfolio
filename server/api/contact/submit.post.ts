import { createClient } from '@sanity/client'

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  try {
    // Get form data from request body
    const body = await readBody(event)
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: name, email, and message are required',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format',
      })
    }

    // Get Sanity configuration from runtime config
    const config = useRuntimeConfig()
    const projectId = config.public.NUXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = config.public.NUXT_PUBLIC_SANITY_DATASET || 'production'
    
    // IMPORTANT: Use write token from server-side only (not public)
    // This should be set in your .env file as SANITY_WRITE_TOKEN
    const token = config.SANITY_WRITE_TOKEN

    if (!token) {
      throw createError({
        statusCode: 500,
        message: 'Server configuration error: Sanity write token not configured',
      })
    }

    // Create Sanity client with write permissions
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2025-07-16',
      token,
      useCdn: false, // Don't use CDN for writes
    })

    // Create form submission document in Sanity
    const submission = await client.create({
      _type: 'formSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new', // Use status instead of read boolean
    })

    // Send email notification (optional, only if configured)
    const notificationEmail = config.NOTIFICATION_EMAIL
    const resendApiKey = config.RESEND_API_KEY

    if (notificationEmail && resendApiKey) {
      try {
        // Import Resend dynamically (only if email is configured)
        const { Resend } = await import('resend')
        const resend = new Resend(resendApiKey)

        // Use Resend's test domain for development, or your verified domain for production
        const fromEmail = config.EMAIL_FROM || 'onboarding@resend.dev'
        
        await resend.emails.send({
          from: fromEmail,
          to: notificationEmail,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('nl-NL')}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>This submission has been saved to Sanity with ID: ${submission._id}</small></p>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString('nl-NL')}

Message:
${message}

---
This submission has been saved to Sanity with ID: ${submission._id}
          `,
        })
      } catch (emailError: any) {
        // Log email error but don't fail the submission
        console.error('Failed to send email notification:', emailError)
        // Continue - submission is already saved to Sanity
      }
    }

    return {
      success: true,
      id: submission._id,
      message: 'Form submission saved successfully',
    }
  } catch (error: any) {
    // Log full error for debugging
    console.error('Form submission error:', {
      message: error.message,
      statusCode: error.statusCode,
      response: error.response?.body,
      error: error,
    })

    // Check for Sanity authentication errors
    if (error.message?.includes('project user not found') || 
        error.message?.includes('401') ||
        error.statusCode === 401 ||
        error.response?.statusCode === 401) {
      const config = useRuntimeConfig()
      throw createError({
        statusCode: 401,
        message: `Authentication failed. Please verify: 1) Token has Editor permissions for dataset "${config.public.NUXT_PUBLIC_SANITY_DATASET || 'production'}", 2) Token is for project "${config.public.NUXT_PUBLIC_SANITY_PROJECT_ID}", 3) Dev server was restarted after updating .env file. Original error: ${error.message}`,
      })
    }

    // Check for Sanity API errors
    if (error.response?.body) {
      const sanityError = error.response.body
      throw createError({
        statusCode: error.statusCode || 500,
        message: sanityError.message || error.message || 'Sanity API error occurred',
      })
    }

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to submit form',
    })
  }
})

