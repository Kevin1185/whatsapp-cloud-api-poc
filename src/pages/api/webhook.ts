import type { NextApiRequest, NextApiResponse } from "next";

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verified");
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Forbidden");
  }

  if (req.method === "POST") {
    console.log("📩 Webhook event received");
    console.log(JSON.stringify(req.body, null, 2));

    // IMPORTANT: always respond 200
    return res.status(200).json({ received: true });
  }

  return res.status(405).end();
}
