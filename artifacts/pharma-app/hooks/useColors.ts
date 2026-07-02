import { useColorScheme } from 'react-native';
import colors from '@/constants/colors';

type Palette = typeof colors.light;
type ColorSchemes = { light: Palette; dark?: Palette; radius: number };

/**
 * Returns the design tokens for the current color scheme.
 *
 * The returned object contains all color tokens for the active palette
 * plus scheme-independent values like `radius`.
 *
 * Falls back to the light palette when no dark key is defined in
 * constants/colors.ts. When a `dark` key is present, this hook
 * switches automatically based on the device's appearance setting.
 */
export function useColors() {
  const scheme = useColorScheme();
  const themes = colors as ColorSchemes;
  const palette = scheme === 'dark' && themes.dark ? themes.dark : themes.light;
  return { ...palette, radius: colors.radius };
}
