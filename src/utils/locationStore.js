/**
 * locationStore.js
 * Thin localStorage wrapper for the PromisePour locations.
 */

const STORAGE_KEY = 'promisepour_locations';

/** Default seed items */
export const getDefaultLocations = () => [
  { id: 'loc_1', city: "Ijegun Outlet", address: "Oluarikawe street, Ijegun, Lagos", times: "8:00 AM - 9:00 PM", active: true },
  { id: 'loc_2', city: "Yaba", address: "Yaba, Lagos", times: "9:00 AM - 8:30 PM", active: true },
  { id: 'loc_3', city: "Obalende", address: "Obalende, Lagos", times: "9:00 AM - 8:30 PM", active: true }
];

/**
 * Returns the current locations from localStorage.
 * Falls back to seed data if nothing has been saved yet.
 */
export const getLocations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupted data — fall through to defaults
  }
  return getDefaultLocations();
};

/**
 * Persists the given locations array to localStorage.
 */
export const saveLocations = (locations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  } catch (err) {
    console.error('PromisePour locationStore: failed to save.', err);
    throw err;
  }
};
