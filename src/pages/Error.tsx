import { useNavigate } from "react-router-dom";
import useTheme from "../Hooks/useTheme";
import Button from "../components/Button";
import style from "./Error.module.scss";
import { TbError404 } from "react-icons/tb";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function Error() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  function handleOnGoBack() {
    navigate(-1);
  }
  function errorIcon() {
    return <MdOutlineKeyboardBackspace style={{ marginRight: "0.5rem" }} />;
  }

  return (
    <div className={`${style.errorPageMain} ${isDark && style.dark}`}>
      <TbError404 className={style.errorSVG} />
      <h2>Not Found</h2>
      <Button
        icon={errorIcon}
        mode={isDark}
        isBold
        onClick={handleOnGoBack}
        buttonText="Go Back"
      />
    </div>
  );
}
