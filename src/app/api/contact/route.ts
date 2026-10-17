// Prototype endpoint: validates and accepts the message. In production this forwards to the
// ESA shared mailbox (F9) via the chosen email provider.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without processing them
  if (typeof body.website === "string" && body.website.length > 0) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || !body.consent) {
    return Response.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  return Response.json({ ok: true });
}
