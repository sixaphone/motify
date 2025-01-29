import axios from "axios";

export class WhatsAppBot {
  constructor(accessToken, phoneNumberId) {
    this.accessToken = accessToken;
    this.phoneNumberId = phoneNumberId;
    this.apiVersion = "v21.0";
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}`;
  }

  async sendMessage(recipientNumber, message) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientNumber,
          type: "text",
          text: {
            preview_url: true,
            body: message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error sending WhatsApp message:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async sendTemplate(
    recipientNumber,
    templateName,
    languageCode = "en",
    components = []
  ) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          messaging_product: "whatsapp",
          to: recipientNumber,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: languageCode,
            },
            components: components,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error sending WhatsApp template:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
