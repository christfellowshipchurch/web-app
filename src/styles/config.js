import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

// Corresponds to bootstrap's values for styles like p-1, mr-2, px-3, etc
const baseUnitMap = Object.freeze([
  '0.25rem', // 1
  '0.5rem', // 2
  '1rem', // 3
  '1.5rem', // 4
  '3rem', // 5
]);

// export const baseUnit = (n = 1) => `${amount * n}${unit}`;
export const baseUnit = (n = 1) => {
  try {
    return baseUnitMap[n];
  } catch (err) {
    console.error(err);
  }

  return 0;
};

/**
 * A definition of colors, simple named color values. This is not the place to
 * assign usage or imply where in the app a color is intended
 */
export const colors = Object.freeze({
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

export const theme = Object.freeze({
  brand: colors.cyan,
  liveEvent: colors.red,
  body: {
    background: colors.gray[50],
  },
  card: {
    background: colors.white,
    color: colors.gray[500],
  },
  font: {
    ...colors.gray, // Hypothetically, this could be reversed for dark mode
  },
});

/**
 * A custom hook that returns the current theme for the app, as defined in
 * the styled-components <ThemeProvider> at the root app level.
 * @example
 * import React from 'react;
 * import { useTheme } from 'styles/config';
 *
 * export default const MyThemedComponent = () => {
 *   const theme = useTheme();
 *
 *   return (
 *     <h1 style={{ color: theme.brand }}>
 *       This is the brand color ({theme.brand})
 *     </h1>
 *   );
 * }
 */
export const useTheme = () => {
  return useContext(ThemeContext);
};
