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
      "custom-green": "#AEFF08",
      "custom-purple": "#9677F7",
      "custom-white": "#FEFBF0",
      "custom-red": "#F05464",
      "purple-light": "#C6B5F9",
      "red-light": "#F9D5D1",
    },
  },
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Inter",
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
