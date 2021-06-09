import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartState } from "./Cart";
import { Cart } from "./Cart";

import logo from "../img/AlgoBreizh_Logo.png";
import menu from "../img/menu.png";
import Logout from "./Logout";
import profil from "../img/profile-user.png";

export const Nav = () => {
  let location = useLocation();
  const [cart] = useCartState([]);
  const [isDropdown, setDropdown] = React.useState(false);
  const [isCartdown, setCartdown] = React.useState(false);
  const [isMenu, setMenu] = React.useState(false);
  const [scroll, setScroll] = React.useState(1);

  React.useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 160;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  return (
    <>
      <nav className={scroll ? "navbar" : "navbar navbar-scrolled"}>
        <div className="nav-container">
          {scroll ? null : (
            <div className="left">
              <Link to="/">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </div>
          )}

          <div className="right">
            <Link className={scroll ? "nav-item" : "nav-item scrolled"} to="/">
              Accueil
            </Link>
            <span
              onMouseEnter={() => setCartdown(true)}
              className={isCartdown ? "cart badge" : "cart badge"}
            >
              <svg
                className="cartLogo"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 512 512"
                viewBox="0 0 512 512"
              >
                <g>
                  <path
                    d="m452 120h-60.946c-7.945-67.478-65.477-120-135.054-120s-127.109 52.522-135.054 120h-60.946c-11.046 0-20 8.954-20 20v352c0 11.046 8.954 20 20 20h392c11.046 0 20-8.954 20-20v-352c0-11.046-8.954-20-20-20zm-196-80c47.484 0 87.019 34.655 94.659 80h-189.318c7.64-45.345 47.175-80 94.659-80zm176 432h-352v-312h40v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-60h192v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-60h40z"
                    fill={scroll ? "#fff" : "#444"}
                  />
                </g>
              </svg>
              <span className="badge-number">{cart.length}</span>
            </span>
            {isCartdown && (
              <div
                onMouseLeave={() => setCartdown(false)}
                className={
                  scroll
                    ? "dropdown-cart"
                    : "dropdown-cart dropdown-cart-scrolled"
                }
              >
                <Cart />
              </div>
            )}
            {localStorage.getItem("jwt") ? (
              <button
                onClick={Logout}
                className={scroll ? "btn" : "btn scrolled"}
                style={{ marginLeft: 20 }}
              >
                Se déconnecter
              </button>
            ) : (
              <Link
                to={`${location.pathname}/login`}
                className={scroll ? "btn" : "btn scrolled"}
                style={{ marginLeft: 20 }}
              >
                Se connecter
              </Link>
            )}
            <img
              className="profil-btn"
              style={scroll ? {} : { filter: "invert(0.2)" }}
              onClick={() => setDropdown((on) => !on)}
              src={profil}
              alt=""
            />
            {isDropdown && (
              <div
                className={
                  scroll
                    ? "dropdown-services"
                    : "dropdown-services dropdown-services-scrolled"
                }
                onMouseLeave={() => setDropdown(false)}
              >
                {localStorage.getItem("role") === "Administrateur" ? (
                  <Link to="/espace" className="btn auth">
                    Espace administrateur
                  </Link>
                ) : (
                  <Link to="/commandes" className="btn auth">
                    Mes commandes
                  </Link>
                )}
              </div>
            )}
          </div>
          <div>
            <img
              onClick={() => setMenu((on) => !on)}
              className="btnMenuMobile"
              src={menu}
              alt="menu"
            />
          </div>
        </div>
        {isMenu && (
          <>
            <div
              className="background-menuMobile"
              onClick={() => setMenu(false)}
            />
            <div className="menuMobile">
              <div className="container_menuMobile"></div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};
