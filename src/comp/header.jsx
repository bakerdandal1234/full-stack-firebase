import React from "react";
import {  Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { signOut } from "firebase/auth";
import {  useTranslation } from 'react-i18next';



const Header = () => {
  const { t, i18n } = useTranslation();
  const [user ] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">

      <header className="hide-when-mobile baker ">
        <h1>
    
          <Link to="/"> baker dandal </Link>
        </h1>
        {/* <button
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="theme-btn"
        >
          {theme}
        </button> */}

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">



          {!user && <li className="main-list">
            <NavLink className="main-link" to="/signin">
            {t("Sign-in")} 
            </NavLink>

          </li>}



          {!user && <li className="main-list">
            <NavLink className="main-link" to="/signup">
            {t("Sign-up")} 
            </NavLink>

          </li>}
          <li className="main-list lang">
            <p>{t("language")} </p>
          <ul className="lang-box">
            <li onClick={() => {
              i18n.changeLanguage("ar")
            }} dir="rtl">
              <p>عربية</p>
              {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}   
            </li>
            <li onClick={() => {
              i18n.changeLanguage("en")
            }}>
              <p>english</p>
              {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}      
              </li>
            <li onClick={() => {
              i18n.changeLanguage("fr")}}>
              <p>francais</p>
              {i18n.language === "fr" && (
                  <i className="fa-solid fa-check"></i>
                )}      
              </li>
          </ul>

          
          
          
          
          
          </li>
        
          {user && <li onClick={() => {
            signOut(auth).then(() => {
              console.log("Sign-out successful.")
            }).catch((error) => {
              // An error happened.
            });
          }} className="main-list">
            <button className="main-link signout">
              {t("signout")}
            </button>

          </li>}


          {user && <li className="main-list">
            <NavLink className="main-link" to="/about">
            {t("about")}
            </NavLink>

          </li>}

  
          {user && <li className="main-list">
            <NavLink className="main-link" to="/profile">
            {t("profile")}
            </NavLink>
        
          </li>}


        </ul>
      </header>



 
  
  
    </div>
  );
};

export default Header;
