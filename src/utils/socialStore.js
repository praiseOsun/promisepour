/**
 * socialStore.js
 * Thin localStorage wrapper for the PromisePour social links.
 */

const STORAGE_KEY = 'promisepour_social_links';

/** Default seed items */
export const getDefaultSocials = () => [
  { id: 'soc_instagram', platform: 'Instagram', url: 'https://www.instagram.com/promisepour/', active: true },
  { id: 'soc_facebook', platform: 'Facebook', url: 'https://www.facebook.com/promisepour/', active: true },
  { id: 'soc_tiktok', platform: 'TikTok', url: 'https://www.tiktok.com/@promisepour?_r=1&_t=ZS-96k02OjNXvU', active: true },
  { id: 'soc_whatsapp', platform: 'WhatsApp', url: 'https://wa.me/2349027679677', active: true }
];

/**
 * Returns the current social links from localStorage.
 * Falls back to seed data if nothing has been saved yet.
 */
export const getSocials = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupted data — fall through to defaults
  }
  return getDefaultSocials();
};

/**
 * Persists the given social links array to localStorage.
 */
export const saveSocials = (socials) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(socials));
  } catch (err) {
    console.error('PromisePour socialStore: failed to save.', err);
    throw err;
  }
};
