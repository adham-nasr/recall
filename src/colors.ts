const hue = 191;
const sat = 60; // Use numbers for easy math

// Helper to make HSL strings React Native can read
const hsl = (h:number, s:number, l:number, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

const colors = {
  primary500: hsl(hue, sat, 65),
  primary600: hsl(hue, sat, 50),
  primary700: hsl(hue, sat, 40),
  
  danger: 'hsl(0, 80%, 75%)',
  success: 'hsl(142, 65%, 69%)',
  warning: '#d97706',
  info: '#0284c7',
  
  bg:            hsl(hue, 20, 98),
  surface:       hsl(hue, 18, 96),
  surface2:      hsl(hue, 16, 92),
  border:        hsl(hue, 14, 85),
  borderStrong:  hsl(hue, 14, 75),
  text:          hsl(hue, 25, 12),
  textMuted:     hsl(hue, 15, 35),
  
  onPrimary: '#ffffff',
  focusRing: hsl(hue, sat, 50, 0.3),
};

// Map your aliases
export const COLORS = {
  ...colors,
  primary: colors.primary600,
  primaryHover: colors.primary700,
  hover: colors.surface2,
};