"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

import { usarContextoApp } from "../../contexts/AppContext";

const Toaster = ({ ...props }: ToasterProps) => {
  const { temaDark } = usarContextoApp();
  const temaToaster = temaDark ? "dark" : "light";

  return (
    <Sonner
      theme={temaToaster as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
