// utils/validateToken.ts

export function isValidToken(token: string): boolean {
  if (!token) return false;

  const parts = token.split(".");

  if (parts.length < 2) return false;

  const [header, payload] = parts;

  return header.startsWith("ey") && payload.startsWith("ey");
}
