import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// Resend client
// ---------------------------------------------------------------------------
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

// ---------------------------------------------------------------------------
// Welcome email HTML template
// ---------------------------------------------------------------------------
function buildWelcomeEmail(name) {
  const firstName = name.split(' ')[0];
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Fundraising for Good</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header Bar -->
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#00A651,#1B2A4A);"></td>
          </tr>

          <!-- Logo / Brand -->
          <tr>
            <td style="padding:36px 40px 0 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#1B2A4A;letter-spacing:-0.5px;">
                Fundraising for Good
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1B2A4A;">
                Welcome aboard, ${firstName}! 🎉
              </h2>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#4a5568;">
                Thank you for joining the Fundraising for Good network. You've just taken the first step towards being part of a movement that's changing how charitable giving works.
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#4a5568;">
                We're building a platform where <strong style="color:#1B2A4A;">every donation goes further</strong>, transparency is the standard, and communities are empowered to create lasting change.
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4a5568;">
                We'll be in touch soon with next steps. In the meantime, keep an eye on your inbox — exciting things are coming.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#00A651;border-radius:50px;text-align:center;">
                    <a href="https://fundraisingforgood.org" target="_blank" style="display:inline-block;padding:14px 36px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Learn More
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 36px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#a0aec0;">
                Fundraising for Good
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e0;">
                You're receiving this because you joined the FFG network.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// POST /api/join  —  Send welcome email
// ---------------------------------------------------------------------------
app.post('/api/join', async (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Welcome to Fundraising for Good 🎉',
      html: buildWelcomeEmail(name),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    console.log(`✅ Welcome email sent to ${email} (id: ${data.id})`);
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 FFG API server running on http://localhost:${PORT}`);
});
