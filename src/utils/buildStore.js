/**
 * buildStore.js
 * LocalStorage wrapper for the "Build Your Parfait" options.
 */

const STORAGE_KEY = 'promisepour_build_options';

export const getDefaultBuildOptions = () => ({
  bases: [
    'Classic Sweetened Cream',
    'Greek Unsweetened (Thick)',
    'Vanilla Infused Yoghurt',
    'Strawberry Flavored Youghurt',
    'Banana Flavored Youghurt'
  ],
  fruits: [
    'Sweet Strawberries 🍓',
    'Fresh Blueberries 🫐',
    'Ripe Mango Slices 🥭',
    'Tangy Kiwi 🥝',
    'Sweet Banana 🍌'
  ],
  crunches: [
    'Organic Honey Granola',
    'Choco-Oat Crisp',
    'Almond Seed Crunch'
  ],
  drizzles: [
    'Organic Raw Honey',
    'Homemade Strawberry Coulis',
    'Rich Caramel Drizzle'
  ]
});

export const getBuildOptions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        parsed &&
        Array.isArray(parsed.bases) &&
        Array.isArray(parsed.fruits) &&
        Array.isArray(parsed.crunches) &&
        Array.isArray(parsed.drizzles)
      ) {
        return parsed;
      }
    }
  } catch {
    // Return defaults on error
  }
  return getDefaultBuildOptions();
};

export const saveBuildOptions = (options) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
  } catch (err) {
    console.error('PromisePour buildStore: failed to save.', err);
    throw err;
  }
};
