import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const themes = {
  light: {
    name: "Beach Day",
    colors: {
      primary: "37 99 235", // Blue
      secondary: "247 200 115", // Sandy Yellow
      accent: "167 216 247", // Light Blue
      background: "243 250 255", // Very Light Blue
      "background-secondary": "255 248 231", // Creamy Sand
      text: "45 58 74", // Deep Blue
      "text-secondary": "91 107 122", // Muted Blue
      border: "167 216 247", // Light Blue
      success: "16 185 129", // Green
      error: "239 68 68", // Red
      warning: "245 158 11", // Yellow
    }
  },
  dark: {
    name: "Sunset Night",
    colors: {
      primary: "37 99 235", // Blue
      secondary: "247 200 115", // Sandy Yellow
      accent: "58 80 107", // Deep Blue
      background: "27 38 59", // Night Blue
      "background-secondary": "34 47 62", // Slightly lighter Night Blue
      text: "247 200 115", // Sandy Yellow
      "text-secondary": "224 225 221", // Pale Sand
      border: "58 80 107", // Deep Blue
      success: "16 185 129", // Green
      error: "239 68 68", // Red
      warning: "245 158 11", // Yellow
    }
  },
  icecream: {
    name: "Ice Cream",
    colors: {
      primary: "247 168 184", // Strawberry Pink
      secondary: "167 216 247", // Light Blue
      accent: "247 168 184", // Strawberry Pink
      background: "255 240 245", // Light Pink
      "background-secondary": "253 246 227", // Vanilla Cream
      text: "123 63 0", // Chocolate Brown
      "text-secondary": "181 101 29", // Caramel
      border: "167 216 247", // Light Blue
      success: "16 185 129", // Green
      error: "239 68 68", // Red
      warning: "245 158 11", // Yellow
    }
  },
  ocean: {
    name: "Ocean Wave",
    colors: {
      primary: "0 180 216", // Bright Aqua
      secondary: "144 224 239", // Soft Aqua
      accent: "0 180 216", // Bright Aqua
      background: "202 240 248", // Pale Aqua
      "background-secondary": "241 250 238", // White Sand
      text: "2 62 138", // Deep Ocean Blue
      "text-secondary": "0 119 182", // Medium Blue
      border: "144 224 239", // Soft Aqua
      success: "16 185 129", // Green
      error: "239 68 68", // Red
      warning: "245 158 11", // Yellow
    }
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme && themes[savedTheme] ? savedTheme : "light";
  });

  useEffect(() => {
    const theme = themes[currentTheme];
    if (!theme) return;

    localStorage.setItem("theme", currentTheme);
    
    // Set Tailwind CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleTheme = () => {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setCurrentTheme(themeNames[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      changeTheme, 
      themes,
      theme: currentTheme, // Alias for compatibility
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 