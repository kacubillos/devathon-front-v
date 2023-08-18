import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  theme: {
    colors: {
      "--primary-50": "#353a5d",
      "--primary-100": "#424874",
      "--primary-200": "#A6B1E1",
      "--primary-300": "#fdf6fd",
      "--accent-100": "#D9ACF5",
      "--accent-200": "#FFCEFE",
      "--bg-100": "#F4EEFF",
      "--bg-200": "#DCD6F7",
      "--bg-300": "#bbb9e9",
    },
  },
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Nunito Sans",
      },
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
      cdn: "https://esm.sh/",
    }),
  ],
});
