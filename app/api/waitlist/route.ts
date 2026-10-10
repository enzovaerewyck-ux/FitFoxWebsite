import { NextResponse } from "next/server";

/**
 * Early-access signups → Google Sheet (via a Google Apps Script web app).
 * Env vars (set on Vercel → Project → Settings → Environment Variables):
 *   WAITLIST_SHEET_URL  the Apps Script "Web app" URL
 *   WAITLIST_SECRET     the same secret as in google-apps-script/Code.gs
 * The browser only ever talks to this route, so the sheet URL and secret stay private.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown; website?: unknown; consent?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const url = process.env.WAITLIST_SHEET_URL;
  const secret = process.env.WAITLIST_SECRET;
  if (!url || !secret) {
    console.error("[waitlist] WAITLIST_SHEET_URL or WAITLIST_SECRET is not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // text/plain keeps Apps Script happy; it follows Google's redirect to the result.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret,
        email,
        source: typeof body.source === "string" ? body.source : "website",
        consent: typeof body.consent === "string" ? body.consent : "",
      }),
      redirect: "follow",
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !data?.ok) throw new Error(`sheet responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
