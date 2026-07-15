/**
 * menuStore.js
 * Thin localStorage wrapper for the PromisePour menu.
 * All reads/writes go through this module so the rest of the app
 * never touches localStorage directly.
 */

const STORAGE_KEY = 'promisepour_menu_items';

/** Default seed items — migrated from TopPicks + hardcoded menu.jsx entries */
export const getDefaultItems = () => [
  // ── Parfaits ────────────────────────────────────────────────────────────
  {
    id: 'berry_bliss',
    name: 'Berry Bliss Parfait',
    desc: 'Cashew nut, grape, coconut flakes, almond, strawberries, apple, milky yoghurt',
    price: '₦5,500',
    category: 'Parfaits',
    image: '/berry_bliss.png',
  },
  {
    id: 'strawberry_bliss',
    name: 'Strawberry Bliss',
    desc: 'Strawberries, granola, honey layers.',
    price: '₦4,500',
    category: 'Parfaits',
    image: '',
  },
  {
    id: 'tropical_passion',
    name: 'Tropical Passion',
    desc: 'Mango, coconut, granola, kiwi bits.',
    price: '₦5,000',
    category: 'Parfaits',
    image: '',
  },
  {
    id: 'blueberry_orchard',
    name: 'Blueberry Orchard',
    desc: 'Blueberry glaze, premium grains, yoghurt.',
    price: '₦5,200',
    category: 'Parfaits',
    image: '',
  },
  {
    id: 'nutty_honeycomb',
    name: 'Nutty Honeycomb',
    desc: 'Almonds, cashews, pure honeycomb, yoghurt.',
    price: '₦4,800',
    category: 'Parfaits',
    image: '',
  },

  // ── Yoghurts ────────────────────────────────────────────────────────────
  {
    id: 'vanilla_delight',
    name: 'Vanilla Delight',
    desc: 'Creamy vanilla flavored yoghurt.',
    price: '₦2,500',
    category: 'Yoghurts',
    image: '/vanilla_delight.png',
  },
  {
    id: 'plain_sweetened',
    name: 'Plain Sweetened',
    desc: 'Creamy sweetened yoghurt.',
    price: '₦2,500',
    category: 'Yoghurts',
    image: '/banana_plum.png',
  },
  {
    id: 'strawberry_dream',
    name: 'Strawberry Dream',
    desc: 'Creamy strawberry flavored yoghurt.',
    price: '₦2,500',
    category: 'Yoghurts',
    image: '/milky_yoghurt.png',
  },
];

/**
 * Returns the current menu items from localStorage.
 * Falls back to seed data if nothing has been saved yet.
 */
export const getMenuItems = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupted data — fall through to defaults
  }
  return getDefaultItems();
};

/**
 * Persists the given items array to localStorage.
 * Throws if localStorage is full (e.g. too many large base64 images).
 */
export const saveMenuItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('PromisePour menuStore: failed to save — storage may be full.', err);
    throw err;
  }
};

/**
 * Resets the menu back to the built-in seed data.
 */
export const resetMenuItems = () => {
  localStorage.removeItem(STORAGE_KEY);
};
