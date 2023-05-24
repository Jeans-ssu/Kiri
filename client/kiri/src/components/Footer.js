import { SiGithub } from 'react-icons/si';
import styled from 'styled-components';

const Foot = styled.footer`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.darkgray};

  width: 100%;
  box-sizing: border-box;
  height: 100px;
  @media screen and (max-width: 767px) {
    height: 80px;
  }
  color: #bfbfbf;

  a {
    color: #bfbfbf;
    text-decoration: none;
    font-weight: 500;
  }

  img {
    margin-left: 40px;
    padding: 5px 10px 5px 0;
    border-right: 1px solid #bfbfbf;
    width: 60px;
    height: 60px;
    @media screen and (max-width: 767px) {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      font-size: 1.2em;
    }
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
      <div className="version">version 2.1.5</div>
    </Foot>
  );
};

export default Footer;
