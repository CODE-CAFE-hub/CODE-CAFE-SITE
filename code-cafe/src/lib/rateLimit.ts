import { NextApiRequest } from "next";

const rateLimit = (() => {
  const requests: Map<string, number> = new Map();

  return (req: NextApiRequest): { success: boolean } => {
    const ip: string | string[] | undefined =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const now: number = Date.now();

    if (!requests.has(ip as string)) {
      requests.set(ip as string, now);
      return { success: true };
    }

    const lastRequest: number | undefined = requests.get(ip as string);
    if (lastRequest && now - lastRequest < 60000) {
      // 1 minute rate limiting
      return { success: false };
    }

    requests.set(ip as string, now);
    return { success: true };
  };
})();

export default rateLimit;
