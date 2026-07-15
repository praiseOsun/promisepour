/**
 * emailStore.js
 * Thin localStorage wrapper for the PromisePour contact email settings (EmailJS keys).
 */

const STORAGE_KEY = 'promisepour_email_settings';

/** Default placeholder/empty values */
export const getDefaultEmailSettings = () => ({
  serviceId: '',
  templateId: '',
  publicKey: '',
  recipientEmail: 'osunlekepro@gmail.com'
});

/**
 * Returns the current email settings from localStorage.
 */
export const getEmailSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return {
          serviceId: parsed.serviceId || '',
          templateId: parsed.templateId || '',
          publicKey: parsed.publicKey || '',
          recipientEmail: parsed.recipientEmail || 'osunlekepro@gmail.com'
        };
      }
    }
  } catch {
    // Corrupted data — fall through to defaults
  }
  return getDefaultEmailSettings();
};

/**
 * Persists the given email settings to localStorage.
 */
export const saveEmailSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('PromisePour emailStore: failed to save.', err);
    throw err;
  }
};
