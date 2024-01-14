import React, { useContext } from "react";
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
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";
import { useNavigate } from "react-router-dom";
const SideBar: React.FC = () => {
  let { user, logOut } = useContext(LoginContext) as LoginContextType;

  let nav = useNavigate();
  const handleToLogin = () => {
    nav("/login");
  };

  const handleLogout = async (): Promise<void> => {
    try {
      logOut();
      nav("/login");
    } catch (err) {
      console.log("Error log out : ", err);
    }
  };

  const handleNavProfile = (path: string) => {
    nav(path);
  };

  return (
    <section className="sidebar">
      <div className="sidebar__user">
        {user.token === "NOTOKEN" ? (
          <span>Guest</span>
        ) : (
          <span>{user.username}</span>
        )}
      </div>

      <div className="sidebar__search">
        <div className="search-box">
          <input
            className="search-box__input"
            type="text"
            placeholder="Search notes ..."
            name="q"
          />
          <button className="search-box__button" type="submit">
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      <div className="sidebar__items">
        <ul className="navigation__leftBar__options">
          <li
            className="navigation__leftBar__options__item"
            onClick={() => handleNavProfile("/")}
          >
            <a href="#">
              <FontAwesomeIcon
                className="navigation__leftBar__options__item__icon"
                icon={faHome}
              />
            </a>
            <span className="navigation__leftBar__options__item__text">
              Home
            </span>
          </li>

          <li
            className="navigation__leftBar__options__item"
            onClick={() => handleNavProfile("/notes")}
          >
            <a href="#">
              <FontAwesomeIcon
                className="navigation__leftBar__options__item__icon"
                icon={faNoteSticky}
              />
            </a>
            <span className="navigation__leftBar__options__item__text">
              Notes
            </span>
          </li>
          <li
            className="navigation__leftBar__options__item"
            onClick={() => handleNavProfile("/shared")}
          >
            <a href="#">
              <FontAwesomeIcon
                className="navigation__leftBar__options__item__icon"
                icon={faShare}
              />
            </a>
            <span className="navigation__leftBar__options__item__text">
              Shared Notes
            </span>
          </li>
          <li
            className="navigation__leftBar__options__item"
            onClick={() => handleNavProfile("/trash")}
          >
            <a href="#">
              <FontAwesomeIcon
                className="navigation__leftBar__options__item__icon"
                icon={faTrash}
              />
            </a>
            <span className="navigation__leftBar__options__item__text">
              Trash
            </span>
          </li>
        </ul>
      </div>
      {user.token === "NOTOKEN" ? (
        <div className="sidebar__footer">
          <button
            className="button__first button__firstSmall"
            onClick={() => handleToLogin()}
          >
            Log In
          </button>
        </div>
      ) : (
        <div className="sidebar__footer">
          <button
            className="button__first button__firstSmall"
            onClick={() => handleLogout()}
          >
            Log Out
          </button>
        </div>
      )}
    </section>
  );
};

export default SideBar;
