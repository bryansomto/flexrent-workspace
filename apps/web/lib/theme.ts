import { createTheme, CSSObject, Theme } from "@mui/material/styles";

const typography = {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
   h1: {
    fontSize: '2.5rem', // 40px
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2.1rem', // ~34px
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.7rem', // ~27px
    fontWeight: 600,
  },
  h4: {
    fontSize: '1.4rem', // ~22px
    fontWeight: 600, // Bolder, as it's a sub-section
  },
  h5: {
    fontSize: '1.2rem', // ~19px
    fontWeight: 700, // Even bolder to stand out
  },
  h6: {
    fontSize: '1rem', // 16px
    fontWeight: 700, // BOLD, as it's often a small "label"
  },
    body1: {
      fontSize: '0.95rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.85rem',
      color: '#6B7280',
    },
    subtitle1: {
    fontSize: '1rem',
    fontWeight: 500, // Good for sub-labels
    color: '#6B7280',
  },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
};

type StyleFn = (params: { theme: Theme }) => CSSObject;
const components = {
  MuiCard: {
    styleOverrides: {
      root: (({ theme }: { theme: Theme }) =>
        ({
          borderRadius: 16,
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 2px 8px rgba(0,0,0,0.04)"
              : "0 2px 8px rgba(0,0,0,0.25)",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 16px rgba(0,0,0,0.08)"
                : "0 4px 16px rgba(0,0,0,0.4)",
            transform: "translateY(-2px)",
          },
        } as CSSObject)) as StyleFn,
    },
  },

  MuiButton: {
    styleOverrides: {
      root: (({ theme }: { theme: Theme }) =>
        ({
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "light"
                ? "0 2px 8px rgba(0,0,0,0.12)"
                : "0 2px 8px rgba(0,0,0,0.35)",
          },
        } as CSSObject)) as StyleFn,

      containedPrimary: (({ theme }: { theme: Theme }) =>
        ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light" ? "#00B488" : "#00D1A2",
          },
        } as CSSObject)) as StyleFn,
    },
  },
  
  MuiAppBar: {
    styleOverrides: {
      root: (({ theme }: { theme: Theme }) =>
        ({
          backgroundColor:
            theme.palette.mode === "light"
              ? "#ffffff"
              : theme.palette.background.paper,
          color:
            theme.palette.mode === "light"
              ? "#1A1A1A"
              : theme.palette.text.primary,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 1px 4px rgba(0,0,0,0.08)"
              : "0 1px 4px rgba(0,0,0,0.5)",
        } as CSSObject)) as StyleFn,
    },
  },
};

const lightPalette = {
  mode: "light" as const,
  primary: { main: "#00A87C", contrastText: "#004D40" },
  secondary: { main: "#00D1FF" },
  success: { main: "#22C55E" },
  warning: { main: "#FFD166" },
  error: { main: "#F87272" },
  info: { main: "#9C27B0" },
  background: { default: "#F5F6FA", paper: "#F6F6F6", white: "#FFFFFF",  greenC: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", blueC: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", purpleC: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", orangeC: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
  text: { primary: "#1A1A1A", secondary: "#6B7280",  tertiary: "#4B2E05" },
  divider: "#E5E7EB",
};

const darkPalette = {
    mode: "dark" as const,
    primary: { main: "#00A87C", contrastText: "#FAFAFA" },
    secondary: { main: "#00D1FF" },
    success: { main: "#22C55E" },
    warning: { main: "#FFD166" },
    error: { main: "#F87272" },
    info: { main: "#9C27B0" },
    background: { default: "#0D1117", paper: "#161B22", white: "#FFFFFF", greenC: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", blueC: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", purpleC: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", orangeC: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    text: { primary: "#E5E7EB", secondary: "#9CA3AF", tertiary: "#3C2404" },
    divider: "#1F2937",
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  shape: {
    borderRadius: 14,
  },
  components,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  shape: {
    borderRadius: 14,
  },
  components,
});