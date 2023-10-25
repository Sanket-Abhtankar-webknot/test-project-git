import useTheme from "../Hooks/useTheme";
import Button from "./Button";
import style from "./Navbar.module.scss";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

export default function Navbar() {
  const { theme, handleTheme } = useTheme();
  const isDark = theme === "dark";
  const themeClass = isDark ? style.dark : style.default;

  const iconStyle = { marginRight: ".5rem" };

  function icon() {
    return isDark ? (
      <BsMoonFill style={iconStyle} />
    ) : (
      <BsFillSunFill style={iconStyle} />
    );
  }

  return (
    <header className={`${style.navbarContainerMain} ${themeClass}`}>
      <h1>Where in the world?</h1>
      <Button
        mode={theme === "dark"}
        isBold
        onClick={handleTheme ? handleTheme : () => null}
        buttonText={isDark ? "Dark Mode" : "Light Mode"}
        icon={icon}
      />
    </header>
  );
}
