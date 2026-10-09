
import { Resend } from "resend";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ContactDeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not_configured" | "provider_error" };

const resend = new Resend(process.env.RESEND_API_KEY);

export async function deliverContactMessage(
  contact: ContactMessage,
): Promise<ContactDeliveryResult> {
  if (process.env.CONTACT_DRY_RUN === "true") {
    return { delivered: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;

  if (!apiKey || !recipient) {
    return { delivered: false, reason: "not_configured" };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Caio Melo <contato@caiomelo.codes>",
      to: [recipient],
      replyTo: contact.email,
      subject: `Contato pelo portfólio: ${contact.name}`,
      text: [
        `Nome: ${contact.name}`,
        `E-mail: ${contact.email}`,
        "",
        "Mensagem:",
        contact.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend delivery error:", error.name, error.message);
      return { delivered: false, reason: "provider_error" };
    }

    return { delivered: true };
  } catch (error) {
    console.error("Unexpected contact delivery error:", error);
    return { delivered: false, reason: "provider_error" };
  }
}
