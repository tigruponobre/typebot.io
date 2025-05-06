import { colors } from "@typebot.io/ui/colors";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeColorConfig = {
  light: string;
  dark: string;
};

export const themeColorSchemes = {
  background: {
    light: "#FFFFFF",
    dark: "#1A1A1A",
  },
  containerColor: {
    light: "#27272A",
    dark: "#F1F1F1",
  },
  hostBubbles: {
    background: {
      light: colors.gray.light["1"],
      dark: colors.gray.dark["3"],
    },
    color: {
      light: colors.gray.light["12"],
      dark: colors.gray.dark["12"],
    },
    border: {
      light: colors.gray.light["6"],
      dark: colors.gray.dark["6"],
    },
  },
  guestBubbles: {
    background: {
      light: colors.orange.light["9"],
      dark: colors.orange.dark["9"],
    },
    color: {
      light: colors.gray.light["1"],
      dark: colors.gray.dark["1"],
    },
    border: {
      light: colors.orange.light["6"],
      dark: colors.orange.dark["6"],
    },
  },
  buttons: {
    background: {
      light: colors.orange.light["9"],
      dark: colors.orange.dark["9"],
    },
    color: {
      light: colors.gray.light["1"],
      dark: colors.gray.dark["1"],
    },
    border: {
      light: colors.orange.light["8"],
      dark: colors.orange.dark["8"],
    },
  },
  inputs: {
    background: {
      light: "#FFFFFF",
      dark: "#2D2D2D",
    },
    color: {
      light: colors.gray.light["12"],
      dark: colors.gray.dark["12"],
    },
    placeholder: {
      light: "#9095A0",
      dark: "#6E6E6E",
    },
    border: {
      light: colors.gray.light["7"],
      dark: colors.gray.dark["7"],
    },
  },
  progressBar: {
    color: {
      light: colors.orange.light["9"],
      dark: colors.orange.dark["9"],
    },
    background: {
      light: colors.gray.light["9"],
      dark: colors.gray.dark["9"],
    },
  },
};

export const getThemeColor = (
  colorConfig: ThemeColorConfig,
  mode: ThemeMode
): string => {
  return mode === ThemeMode.LIGHT ? colorConfig.light : colorConfig.dark;
};

export const themeModeVariableName = "--typebot-theme-mode";