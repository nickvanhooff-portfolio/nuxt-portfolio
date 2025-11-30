# Email Notifications Setup

Het contactformulier kan automatisch een email sturen wanneer iemand een bericht indient. Dit is **optioneel** - als je geen email configureert, worden submissions alleen in Sanity opgeslagen.

## Optie 1: Resend (Aanbevolen - Gratis)

### Stappen:

1. **Maak een Resend account:**
   - Ga naar https://resend.com
   - Maak een gratis account (100 emails/dag gratis)
   - Verifieer je email

2. **Maak een API key:**
   - Ga naar API Keys in je dashboard
   - Klik op "Create API Key"
   - Geef het een naam (bijv. "Portfolio Contact Form")
   - Kopieer de API key (begint met `re_`)

3. **Verifieer een domain (optioneel maar aanbevolen):**
   - Ga naar Domains
   - Voeg je domain toe en volg de DNS instructies
   - Of gebruik de test domain voor development

4. **Voeg toe aan `.env`:**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   NOTIFICATION_EMAIL=jouw@email.com
   EMAIL_FROM=Portfolio Contact <noreply@jouwdomein.com>
   ```

## Optie 2: SendGrid

1. **Maak een SendGrid account:**
   - Ga naar https://sendgrid.com
   - Maak een gratis account (100 emails/dag gratis)

2. **Maak een API key:**
   - Settings → API Keys → Create API Key
   - Geef "Full Access" permissions
   - Kopieer de API key

3. **Update de code:**
   - Installeer: `npm install @sendgrid/mail`
   - Vervang Resend code met SendGrid in `submit.post.ts`

## Optie 3: Mailgun

1. **Maak een Mailgun account:**
   - Ga naar https://mailgun.com
   - Maak een gratis account (100 emails/dag eerste 3 maanden)

2. **Configureer:**
   - Verifieer je domain
   - Kopieer API key en domain

## Optie 4: Gmail SMTP (Gratis, maar beperkt)

Voor development/testing kun je Gmail SMTP gebruiken:

1. **Genereer App Password:**
   - Google Account → Security → 2-Step Verification (moet aan staan)
   - App Passwords → Generate
   - Kopieer het wachtwoord

2. **Voeg toe aan `.env`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=jouw@gmail.com
   SMTP_PASS=je-app-password
   NOTIFICATION_EMAIL=jouw@email.com
   ```

3. **Installeer Nodemailer:**
   ```bash
   npm install nodemailer
   ```

## Hoe het werkt:

- Wanneer iemand het formulier invult:
  1. Submission wordt opgeslagen in Sanity ✅
  2. Email wordt verstuurd naar `NOTIFICATION_EMAIL` (als geconfigureerd) 📧
  3. Als email falen, wordt submission nog steeds opgeslagen (email is optioneel)

## Testen:

1. Vul het formulier in op je website
2. Check je email inbox
3. Check Sanity Studio voor de submission

## Troubleshooting:

- **Geen email ontvangen?**
  - Check spam folder
  - Verify dat `RESEND_API_KEY` en `NOTIFICATION_EMAIL` correct zijn ingesteld
  - Check server logs voor email errors
  - Voor Resend: verify je domain of gebruik test mode

- **Email werkt niet?**
  - Submission wordt nog steeds opgeslagen in Sanity
  - Email errors worden gelogd maar blokkeren niet de submission

