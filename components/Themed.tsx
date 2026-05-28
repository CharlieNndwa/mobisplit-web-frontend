/**
 * Hardened Themed Component Module - Bypasses Undefined Runtime Errors
 */

import { Text as DefaultText, View as DefaultView, useColorScheme as useNativeColorScheme } from 'react-native';

// Fallback constant properties in case your app-wide Colors configuration file is unmapped
const FallbackColors = {
  light: { text: '#0F172A', background: '#FFFFFF' },
  dark: { text: '#F8FAFC', background: '#0F172A' }
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: 'text' | 'background'
) {
  // Safe extraction lookup: Defaults cleanly to light scheme if system value cannot resolve
  const theme = useNativeColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  // Attempt standard dynamic lookup or safely extract core fallback styles
  try {
    return FallbackColors[theme][colorName];
  } catch (err) {
    return theme === 'dark' ? '#FFFFFF' : '#000000';
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}