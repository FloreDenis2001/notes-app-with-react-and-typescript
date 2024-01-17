import React, { useState } from "react";
import {
  faComputerMouse,
  faGamepad,
  faHome,
  faMagnifyingGlass,
  faMicrochip,
  faMobileScreenButton,
  faNoteSticky,
  faPerson,
  faShare,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  let [activeNav, setActiveNav] = useState("#home");
  let nav = useNavigate();

  const handlerNavigate = (path: string) => {
    setActiveNav(`#${path}`);
    if (path === "home") {
      nav("/");
    } else {
      nav(`/${path}`);
    }
  };
  return (
    <aside className="navigation__mobile">
      <ul className="navigation__mobile__list">
        <li>
          <a
            onClick={() => handlerNavigate("home")}
            className={
              activeNav === "#home"
                ? "navigation__mobile__link navigation__active"
                : "navigation__mobile__link"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
        <li>
          <a
            onClick={() => handlerNavigate("share")}
            className={
              activeNav === "#share"
                ? "navigation__mobile__link navigation__active"
                : "navigation__mobile__link"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faShare} />
          </a>
        </li>
        <li>
          <a
            onClick={() => handlerNavigate("note")}
            className={
              activeNav === "#note"
                ? "navigation__mobile__link navigation__active"
                : "navigation__mobile__link"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faNoteSticky} />
          </a>
        </li>
        <li>
          <a
            onClick={() => handlerNavigate("trash")}
            className={
              activeNav === "#trash"
                ? "navigation__mobile__link navigation__active"
                : "navigation__mobile__link"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faTrash} />
          </a>
        </li>
        <li>
          <a
            onClick={() => handlerNavigate("login")}
            className={
              activeNav === "#login"
                ? "navigation__mobile__link navigation__active"
                : "navigation__mobile__link"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default NavigationBar;
