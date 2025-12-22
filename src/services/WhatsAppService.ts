import { whatsappConfig } from "../config/whatsapp";
import { httpPost } from "../lib/httpClient";

interface SendTextMessageParams {
  to: string;
  text: string;
}
console.log("Token:", whatsappConfig.accessToken);
export class WhatsAppService {
  static async sendTextMessage({ to, text }: SendTextMessageParams) {
    const url = `${whatsappConfig.graphApiBaseUrl}/${whatsappConfig.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body: text,
      },
    };

    return httpPost(url, payload, whatsappConfig.accessToken);
  }
}
