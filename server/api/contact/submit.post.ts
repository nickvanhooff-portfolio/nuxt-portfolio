import { createSanityWriteClient } from '~/utils/sanity'

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

    // Create Sanity client with write permissions
    // This uses the centralized client utility which handles configuration
    const client = createSanityWriteClient()

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
    const config = useRuntimeConfig()
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
            <p>${message.replaceAll('\n', '<br>')}</p>
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
      } catch (emailError: unknown) {
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
  } catch (error: unknown) {
    // Log full error for debugging
    const errorObj = error && typeof error === 'object' ? error : {}
    const errorMessage = 'message' in errorObj && typeof errorObj.message === 'string' ? errorObj.message : 'Unknown error'
    const statusCode = 'statusCode' in errorObj && typeof errorObj.statusCode === 'number' ? errorObj.statusCode : undefined
    const response = 'response' in errorObj && typeof errorObj.response === 'object' && errorObj.response !== null ? errorObj.response : null
    
    console.error('Form submission error:', {
      message: errorMessage,
      statusCode: statusCode,
      response: response && 'body' in response ? response.body : undefined,
      error: error,
    })

    // Check for Sanity authentication errors
    if (errorMessage.includes('project user not found') || 
        errorMessage.includes('401') ||
        statusCode === 401 ||
        (response && typeof response === 'object' && 'statusCode' in response && response.statusCode === 401)) {
      const config = useRuntimeConfig()
      throw createError({
        statusCode: 401,
        message: `Authentication failed. Please verify: 1) Token has Editor permissions for dataset "${config.public.NUXT_PUBLIC_SANITY_DATASET || 'production'}", 2) Token is for project "${config.public.NUXT_PUBLIC_SANITY_PROJECT_ID}", 3) Dev server was restarted after updating .env file. Original error: ${errorMessage}`,
      })
    }

    // Check for Sanity API errors
    if (response && typeof response === 'object' && 'body' in response) {
      const sanityError = response.body
      const sanityMessage = typeof sanityError === 'object' && sanityError !== null && 'message' in sanityError && typeof sanityError.message === 'string'
        ? sanityError.message
        : errorMessage || 'Sanity API error occurred'
      throw createError({
        statusCode: statusCode || 500,
        message: sanityMessage,
      })
    }

    throw createError({
      statusCode: statusCode || 500,
      message: errorMessage || 'Failed to submit form',
    })
  }
})

