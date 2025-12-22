import type { NextApiRequest, NextApiResponse } from "next";
import { WhatsAppService } from "../../services/WhatsAppService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing to or message" });
  }

  try {
    const result = await WhatsAppService.sendTextMessage({
      to,
      text: message,
    });

    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
