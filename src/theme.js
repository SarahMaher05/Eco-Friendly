import React from "react";
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey, green, yellow } from "@mui/material/colors"; // 💡 استيراد الأخضر والأصفر من MUI

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // === 🌿 ألوان وضع الإضاءة (Eco-Store Light Mode) ===
            
            // 🟢 اللون الأساسي: الأخضر
            primary: {
                main: green[600], // #4CAF50
            },
            // 🟡 اللون الداعم: الأصفر/الذهبي (للتقييمات والأسعار)
            secondary: {
                main: yellow[800], // #FBC02D
            },

          myColor:{
            main: "#F6F9FC", // لون الخلفية الخفيف للأزرار
          },

          bg: {
            main: "#F6F6F6", // خلفية الصفحة الرئيسية
          },
            
            // ⚪ لون الفاصل/الحدود
            divider: grey[300],

            // 🌑 لون النص الرئيسي
            text: {
                primary: grey[900], // أسود داكن
                secondary: grey[700], // رمادي للنصوص الفرعية
            },

          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[300],
          },
        }
      : {
          // === 🌲 ألوان وضع الظلام (Eco-Store Dark Mode) ===
            
            // 🟢 اللون الأساسي: الأخضر
            primary: {
                main: green[400], // #66BB6A
            },
            // 🟡 اللون الداعم: الأصفر/الذهبي
            secondary: {
                main: yellow[600], // #FDD835
            },
            
          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[800],
          },

          bg: {
            main: "#1D2021"
          },

          myColor: {
          main: "#252b32", // لون الخلفية الخفيف للأزرار
          },
            
            // ⚪ لون الفاصل/الحدود
            divider: grey[600],

            // ⚪ لون النص
            text: {
                primary: grey[50], // أبيض ناصع
                secondary: grey[400], // رمادي فاتح للنصوص الفرعية
            },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};