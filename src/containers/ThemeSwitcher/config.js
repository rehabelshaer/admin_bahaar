import { themeConfig } from "@iso/config/theme/theme.config";
const changeThemes = {
  id: "changeThemes",
  label: "themeSwitcher",
  defaultTheme: themeConfig.theme,
  options: [
    {
      themeName: "defaultTheme",
      buttonColor: "#ffffff",
      textColor: "#323332",
      backgroundColor: "#51515b",
    },
    {
      themeName: "theme2",
      buttonColor: "#ffffff",
      textColor: "#323332",
      backgroundColor: "#51515b",
    },
  ],
};
const topbarTheme = {
  id: "topbarTheme",
  label: "themeSwitcher.Topbar",
  defaultTheme: themeConfig.topbar,
  options: [
    {
      themeName: "defaultTheme",
      buttonColor: "white",
      backgroundColor: "white",
      textColor: "#000",
    },
    {
      themeName: "theme4",
      buttonColor: "#000",
      backgroundColor: "#000",
      textColor: "#ffffff",
    },
    {
      themeName: "theme5",
      buttonColor: "#22144c",
      backgroundColor: "#22144c",
      textColor: "#ffffff",
    },
    {
      themeName: "theme6",
      buttonColor: "#4670a2",
      backgroundColor: "#4670a2",
      textColor: "#ffffff",
    },
  ],
};

const sidebarTheme = {
  id: "sidebarTheme",
  label: "themeSwitcher.Sidebar",
  defaultTheme: themeConfig.sidebar,
  options: [
    {
      themeName: "defaultTheme",
      buttonColor: "white",
      backgroundColor: "white",
      textColor: "#000",
    },

    {
      themeName: "theme4",
      buttonColor: "#000",
      backgroundColor: "#000",
      textColor: "#ffffff",
    },
    {
      themeName: "theme5",
      buttonColor: "#22144c",
      backgroundColor: "#22144c",
      textColor: "#ffffff",
    },
    {
      themeName: "theme6",
      buttonColor: "#4670a2",
      backgroundColor: "#4670a2",
      textColor: "#ffffff",
    },
  ],
};
const layoutTheme = {
  id: "layoutTheme",
  label: "themeSwitcher.Background",
  defaultTheme: themeConfig.layout,
  options: [
    {
      themeName: "defaultTheme",
      buttonColor: "#ffffff",
      backgroundColor: "#F1F3F6",
      textColor: undefined,
    },
    {
      themeName: "theme1",
      buttonColor: "#ffffff",
      backgroundColor: "#ffffff",
      textColor: "#323232",
    },
    {
      themeName: "theme2",
      buttonColor: "#F9F9F9",
      backgroundColor: "#F9F9F9",
      textColor: "#ffffff",
    },
    {
      themeName: "theme3",
      buttonColor: "#ebebeb",
      backgroundColor: "#ebebeb",
      textColor: "#ffffff",
    },
  ],
};
const customizedThemes = {
  changeThemes,
  topbarTheme,
  sidebarTheme,
  layoutTheme,
};
export function getCurrentTheme(attribute, selectedThemename) {
  let selecetedTheme = {};
  customizedThemes[attribute].options.forEach((theme) => {
    if (theme.themeName === selectedThemename) {
      selecetedTheme = theme;
    }
  });
  return selecetedTheme;
}
export default customizedThemes;
