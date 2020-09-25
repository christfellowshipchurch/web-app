import color from 'color';

// Corresponds to bootstrap's values for styles like p-1, mr-2, px-3, etc.
// Notice the values are not linear.
const baseUnitMap = Object.freeze([
  '0.25rem', // 1
  '0.5rem', // 2
  '1rem', // 3
  '1.5rem', // 4
  '3rem', // 5
]);

export const baseUnit = (n = 1) => {
  try {
    return baseUnitMap[n];
  } catch (err) {
    console.error(err);
  }

  return 0;
};

/**
 * A definition of colors, simple named color values. This is *not* the place to
 * assign usage or imply where in the app a color is intended.
 * In fact, this is a private object to this module.
 */
const colors = Object.freeze({
  white: '#fff',
  gray: {
    50: '#f6f6f6',
    100: '#e6e6e6',
    200: '#cdcdcd',
    300: '#b4b4b4',
    400: '#9b9b9b',
    500: '#828282',
    600: '#696969',
    700: '#525252',
    800: '#353535',
    900: '#1a1a1a',
  },
  black: '#000',
  red: '#cb045b',
  green: '#1ec27f',
  cyan: '#00aeef',
});

/**
 * A mapping of UI components to color values.
 * Think about the relationships between elements, and err on the side of adding new
 * values over further coupling existing ones together across the app. Just because
 * the color mapping exists, doesn't mean it always makes sense to use it.
 */
export const theme = Object.freeze({
  // Globals
  brand: colors.cyan,
  brandForeground: colors.white,
  fontFamily: {
    sans: '"Gotham A", "Gotham B"',
  },
  font: {
    ...colors.gray, // Hypothetically, this could be reversed for dark mode
    destructive: colors.red,
  },
  fontSize: {
    xsmall: '0.75rem', // ~12px
    small: '0.875rem', // ~14px
    medium: '1rem', // ~16px
  },
  shadow: {
    card: '0 10px 9px -4px rgba(0, 0, 0, 0.07)',
    small: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    medium: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    large: '0 1rem 3rem rgba(0, 0, 0, 0.175)',
  },
  borderRadius: {
    none: 0,
    small: '0.2rem',
    medium: '0.25rem',
    large: '0.3rem',
    circle: '50%',
    pill: '50rem',
  },

  // UI Elements
  body: {
    background: colors.gray[50],
  },
  card: {
    background: colors.white,
    color: colors.gray[500],
  },
  chat: {
    dmsHeader: color(colors.white).alpha(0.95).rgb(),
    message: {
      name: colors.gray[700],
      date: colors.gray[400],
      text: colors.gray[600],
    },
  },
  link: colors.cyan,
  liveEvent: colors.red,
});
