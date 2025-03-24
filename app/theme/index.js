export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  black: '#000000',
  white: '#FFFFFF',
  grey: '#9A9A9A',
  lightGrey: '#F5F5F5',
  error: '#FF5252',
  success: '#4CAF50',
  background: '#FFFFFF',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export default { COLORS, FONTS, SIZES, SPACING, SHADOWS }; 