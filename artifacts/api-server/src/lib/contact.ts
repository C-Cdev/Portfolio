export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ContactDeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not_configured" };

export async function deliverContactMessage(
  contact: ContactMessage,
): Promise<ContactDeliveryResult> {
  void contact;

  if (process.env.CONTACT_DRY_RUN === "true") {
    return { delivered: true };
  }

  // The provider adapter intentionally stays empty until a transactional
  // email service is selected. Keeping this boundary here prevents the
  // React form from being coupled to a provider's SDK or payload format.
  if (!process.env.CONTACT_EMAIL) {
    return { delivered: false, reason: "not_configured" };
  }

  return { delivered: false, reason: "not_configured" };
}