import React from "react";
import {
  FaFacebookF,
  FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
          voluptates? Aperiam expedita.
        </p>
        <div className={styles.social}>
          <FaFacebookF className={styles.icon} />
          <FaInstagram className={styles.icon} />
          <FaXTwitter className={styles.icon} />
          <FaLinkedinIn className={styles.icon} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
