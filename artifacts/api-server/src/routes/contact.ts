import { Router, type IRouter } from "express";
import {
  SubmitContactBody,
  SubmitContactResponse,
} from "@workspace/api-zod";
import { deliverContactMessage } from "../lib/contact";

const router: IRouter = Router();
const requestsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string, now: number): boolean {
  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);
  return false;
}

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "Invalid contact form");
    res.status(400).json({ error: "Confira os campos do formulário." });
    return;
  }

  const ip = req.ip || "unknown";
  if (isRateLimited(ip, Date.now())) {
    req.log.warn({ ip }, "Contact form rate limit reached");
    res
      .status(429)
      .json({ error: "Muitas tentativas. Aguarde um pouco e tente novamente." });
    return;
  }

  // Honeypot submissions look successful to bots without invoking delivery.
  if (parsed.data.website?.trim()) {
    res
      .status(202)
      .json(
        SubmitContactResponse.parse({
          status: "accepted",
          message: "Mensagem recebida.",
        }),
      );
    return;
  }

  const result = await deliverContactMessage({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (!result.delivered) {
    req.log.error(
      { reason: result.reason },
      "Contact provider is not configured",
    );
    res.status(503).json({
      error:
        "O formulário ainda não está conectado a um provedor de e-mail.",
    });
    return;
  }

  res
    .status(202)
    .json(
      SubmitContactResponse.parse({
        status: "accepted",
        message: "Mensagem enviada. Obrigado pelo contato.",
      }),
    );
});

export default router;