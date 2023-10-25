import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import ReactDOM from "react-dom/client";
import "./styleSheets/main.scss";

import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./routes/routes.tsx";

interface ThemeType {
  theme?: string;
  handleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeType>({});
let localTheme = localStorage.getItem("countriesAppTheme");

function App() {
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");

  const handleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("countriesAppTheme", theme);
  }, [theme]);

  const provideTheme = useMemo(
    () => ({
      theme,
      handleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={provideTheme}>
      <RouterProvider router={routerConfig} />
    </ThemeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
