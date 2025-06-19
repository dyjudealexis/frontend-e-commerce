import Cookies from 'js-cookie';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = process.env.NEXT_PUBLIC_COOKIE_SECRET!;
if (!SECRET_KEY) throw new Error('Missing NEXT_PUBLIC_COOKIE_SECRET env var');

function encrypt(value: string): string {
  return AES.encrypt(value, SECRET_KEY).toString();
}

function decrypt(cipher: string): string | null {
  try {
    const bytes = AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(Utf8);
  } catch {
    return null;
  }
}

function serialize<T>(value: T): string {
  return JSON.stringify(value);
}

function deserialize<T = unknown>(str: string): T {
  return JSON.parse(str) as T;
}

export function setEncryptedCookie<T>(
  name: string,
  value: T,
  options?: Cookies.CookieAttributes
): void {
  const text = serialize<T>(value);
  const cipher = encrypt(text);
  Cookies.set(name, cipher, options);
}

export function getEncryptedCookie<T = unknown>(
  name: string
): T | null {
  const cipher = Cookies.get(name);
  if (!cipher) return null;
  const decrypted = decrypt(cipher);
  if (decrypted === null) return null;
  return deserialize<T>(decrypted);
}

export function removeCookie(
  name: string,
  options?: Cookies.CookieAttributes
): void {
  Cookies.remove(name, options);
}
