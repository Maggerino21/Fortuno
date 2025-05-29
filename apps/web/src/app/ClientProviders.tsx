"use client";
import { CssVarsProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./contexts/AuthContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </CssVarsProvider>
  );
}
