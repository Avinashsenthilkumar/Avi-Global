import { NextResponse } from "next/server";

// Backend endpoint for the project enquiry form.
// Currently validates and logs the enquiry server-side.
// To actually deliver enquiries to your inbox, wire in an email
// provider here (e.g. Resend, Nodemailer + SMTP, or SendGrid) once
// you have a company email address — see the TODO below.

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, projectType, budget, message } = body;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // TODO: send an email / push to a CRM once an inbox is configured.
    // Example with Resend:
    // await resend.emails.send({
    //   from: "enquiries@aviglobalsolutions.com",
    //   to: "hello@aviglobalsolutions.com",
    //   subject: `New project enquiry from ${name}`,
    //   text: JSON.stringify(body, null, 2),
    // });

    console.log("New project enquiry:", {
      name,
      company,
      email,
      phone,
      projectType,
      budget,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
