import { React } from "react";
import { Link } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header(props) {
  return (
    <header className="header" aria-label="Место Россия">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <div className="header__text-container">
        <p className="header__text">{props.email}</p>
        <Link
          className="header__text button"
          to={props.link}
          onClick={props.onLinkClick}
        >
          {props.text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
