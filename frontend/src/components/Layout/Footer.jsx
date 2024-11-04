import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; Department of PMSCS</div>
      <div>
        <Link to={"https://www.facebook.com"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"www.linkedin.com/in/m-towhid-rahman-844697251"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
