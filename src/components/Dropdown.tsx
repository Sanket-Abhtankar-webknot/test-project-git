import React, { useState } from "react";
import style from "./Dropdown.module.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import useTheme from "../Hooks/useTheme";

interface Dropdown {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const options = ["Africa", "America", "Asia", "Europe", "Oceania"];

type TItem = string;
type TEvent = React.MouseEvent<HTMLButtonElement>;
type TEventElement = React.MouseEvent<HTMLElement>;
const defaultSelect = "Filter by Region";
type TChangeValueProps = {
  changeValue: (item: string) => void;
};

export default function Dropdown({ changeValue }: TChangeValueProps) {
  const { theme } = useTheme();
  const [text, setText] = useState(defaultSelect);
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";

  function handleItemClick(item: TItem) {
    return (event: TEvent) => {
      event.stopPropagation();
      const target = event.currentTarget.name;
      if (target == item) {
        setText((prev) => {
          if (prev === target) {
            changeValue("");
            return defaultSelect;
          }
          changeValue(target);
          return target;
        });
      }
      setOpen(false);
    };
  }

  function handleOnSelect() {
    setOpen((prev) => !prev);
  }
  function handleBaseClick(event: TEventElement) {
    const isBase = event.currentTarget.id === "menuBase";
    if (isBase) {
      setOpen(false);
    }
  }

  function isSelected(item: string) {
    return item === text;
  }

  return (
    <>
      <button
        onClick={handleOnSelect}
        role="combobox"
        aria-haspopup="listbox"
        aria-labelledby="selected-option"
        aria-controls="dropMenu"
        className={`${style.selectToggle} ${isDark && style.dark}`}
      >
        <span>{text}</span>
        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
      {open && (
        <div id="menuBase" onClick={handleBaseClick} className={style.menuBase}>
          <ul
            role="listbox"
            aria-labelledby="selected-option"
            id="dropMenu"
            className={`${style.selectMenuContainer} ${isDark && style.darkMenu}`}
            aria-hidden={!open}
          >
            {options.map((item) => (
              <li
                className={isSelected(item) ? style.menuItemSelected : ""}
                key={item}
                role="option"
                aria-selected={isSelected(item)}
              >
                <button
                  className="subText"
                  name={item}
                  onClick={handleItemClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
