"use client";

import { grey } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
// const GREY = {
//   0: '#FFFFFF',
//   100: '#F9FAFB',
//   200: '#F4F6F8',
//   300: '#DFE3E8',
//   400: '#C4CDD5',
//   500: '#919EAB',
//   600: '#637381',
//   700: '#454F5B',
//   800: '#212B36',
//   900: '#161C24',
//   500_8: alpha('#919EAB', 0.08),
//   500_12: alpha('#919EAB', 0.12),
//   500_16: alpha('#919EAB', 0.16),
//   500_24: alpha('#919EAB', 0.24),
//   500_32: alpha('#919EAB', 0.32),
//   500_48: alpha('#919EAB', 0.48),
//   500_56: alpha('#919EAB', 0.56),
//   500_80: alpha('#919EAB', 0.8),
// };
const lightColor = "47, 43, 61";
const darkColor = "208, 212, 241";

const mainColor = lightColor;
const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#FFF7E0',
  main: '#FFCC33',
  dark: '#fdc007',
  darker: '#061B64',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: grey[900], // '#212121'
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF", // 'used',
  table: "#FFF5D6",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: grey[800],
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: grey[800],
};

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#F00E0E",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const palette = {
  common: { black: "#000", white: "#fff" },
  customColors: {
    dark: darkColor,
    main: mainColor,
  },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  // grey: GREY,
  gradients: GRADIENTS,
  // divider: "#c8c6c6",
  // divider: "#f8f8f8",
  text: { primary: grey[900], secondary: grey[600], disabled: grey[500] },
  background: { paper: "#fff", default: "#FFCC33", neutral: grey[200] },
  action: {
    active: "#FFCC33",
    hover: "#fdf7e0",
    selected: "#ffc003",
    disabled: grey[500],
    // disabledBackground: grey[500],
    // focus: grey[500],
    hoverOpacity: 0.15,
    disabledOpacity: 0.48,
  },
};

export default palette;
