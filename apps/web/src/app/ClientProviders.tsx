// apps/web/src/app/ClientProviders.tsx
"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./contexts/AuthContext";
import { fortunoTheme, themeColors } from "./theme"; // Import from theme/index.ts
import { useEffect } from "react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // Sync MUI theme colors with CSS custom properties for non-MUI components
  useEffect(() => {
    const root = document.documentElement;
    
    // Update CSS custom properties to match MUI theme
    root.style.setProperty('--primary-color', themeColors.primary);
    root.style.setProperty('--primary-light', themeColors.primaryLight);
    root.style.setProperty('--primary-dark', themeColors.primaryDark);
    root.style.setProperty('--secondary-color', themeColors.secondary);
    root.style.setProperty('--success-color', themeColors.success);
    root.style.setProperty('--error-color', themeColors.error);
    root.style.setProperty('--background-color', themeColors.background);
    root.style.setProperty('--card-color', themeColors.cardColor);
    root.style.setProperty('--text-color', themeColors.textPrimary);
    root.style.setProperty('--text-secondary', themeColors.textSecondary);
    root.style.setProperty('--border-color', themeColors.borderColor);
    root.style.setProperty('--text-tertiary', themeColors.primary); // For username highlighting
  }, []);

  return (
    <ThemeProvider theme={fortunoTheme}>
      <CssBaseline />
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}