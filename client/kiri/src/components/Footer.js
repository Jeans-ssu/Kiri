import { SiGithub } from 'react-icons/si';
import styled from 'styled-components';

const Foot = styled.footer`
  display: flex;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.darkgray};

  width: 100%;
  box-sizing: border-box;
  height: 100px;
  color: #bfbfbf;

  a {
    color: #bfbfbf;
    text-decoration: none;
    font-weight: 500;
  }

  img {
    margin-left: 40px;
    padding-right: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    border-right: 1px solid #bfbfbf;
  }

  p {
    text-align: left;
  }

  p span {
    display: inline-block;
    margin-left: 20px;
    font-weight: light;
    font-size: 11px;
  }

  div.version {
    display: none;
  }
`;

const Footer = () => {
  return (
    <Foot>
      <img
        id="logo"
        src={`${process.env.PUBLIC_URL}/kiri_logo_white.png`}
        width="70"
        height="70"
        alt="logo"
      />
      <p>
        <span>
          <SiGithub href="https://github.com/Jeans-ssu/Kiri" />{' '}
          <a
            href="https://github.com/Jeans-ssu/Kiri"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </span>
        <br />
        <span>
          <a href="https://github.com/jungnoeun">@jungnoeun </a>
          <a href="https://github.com/SujinKim1127">@SujinKim1127 </a>
          <a href="https://github.com/jwo0o0">@jwo0o0 </a>
        </span>
        <br />
        <span>Copyright 2023. Kiri. All rights reserved.</span>
      </p>
      <div className="version">version 1.0.0</div>
    </Foot>
  );
};

export default Footer;
