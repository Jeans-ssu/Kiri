import React from "react";
import { SiGithub } from "react-icons/si"

export const Footer = () => {
  return (
    <footer>
        <img id="logo" src={`${process.env.PUBLIC_URL}/kiri_logo.png`} width="70" height="70" />
        <p>
            <span><SiGithub href="https://github.com/Jeans-ssu/Kiri"/> <a href="https://github.com/Jeans-ssu/Kiri" target='_blank'>Github</a></span><br/>
            <span>Made by: 정노은, 김수진, 김정우</span><br/>
            <span>Copyright @ Kiri</span>
        </p>
    </footer>
  );
};
