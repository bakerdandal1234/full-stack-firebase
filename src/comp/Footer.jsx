import React from "react";
import    './Footer.css';
import i18n from "i18n";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
<div className="myfooter">
      <footer className="baker   ">
      {i18n.language === "en" && (
              "Designed and developed by abou_dandal8" 
                )},
                  {i18n.language === "fr" && (
              "   Conçu et développé par abou_dandal8" 
                )},
                  {i18n.language === "ar" && (
              "تم التصميم والبرمجة بواسطة ابو_دندل8" 
                )}      
      
         <span>  <i className="fa-solid fa-heart"></i> </span>
      </footer>
</div>
  );
};

export default Footer;
