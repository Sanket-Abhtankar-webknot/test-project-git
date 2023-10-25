import style from "./button.module.scss";

interface Button {
  onClick: (data?: any) => void;
  icon?: () => JSX.Element;
  buttonText: string;
  isBold?: boolean;
  props?: any;
  cs?: any;
  className?: string;
  mode?: boolean;
}

export default function Button({
  onClick,
  mode,
  icon,
  isBold,
  buttonText,
  className,
  cs,
  ...props
}: Button) {
  let Icon = icon ? icon() : "";
  let modeStyle = mode ? style.dark : style.default;
  return (
    <button
      style={{ ...cs }}
      type="button"
      className={`${
        isBold ? style.buttonIsBold : style.buttonMain
      } ${modeStyle}`}
      onClick={onClick}
      {...props}
    >
      {Icon}
      <span>{buttonText}</span>
    </button>
  );
}
