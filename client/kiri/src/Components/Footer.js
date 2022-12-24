import { SiGithub } from 'react-icons/si';
import styled from 'styled-components';

const Foot = styled.footer`
  display: flex;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  background-color: #86ddb8;
  width: 100%;
  box-sizing: border-box;
  height: 90px;

  img {
    margin-left: 40px;
    padding-right: 10px;
    border-right: solid 2px rgb(99, 99, 99);
  }

  p {
    text-align: left;
    color: rgb(99, 99, 99);
  }

  p span {
    display: inline-block;
    margin-left: 20px;
    font-weight: bold;
  }

  p span a {
    text-decoration-line: none;
    color: rgb(99, 99, 99);
  }
`;

export const Footer = () => {
  return (
    <Foot>
      <img
        id="logo"
        src={`${process.env.PUBLIC_URL}/kiri_logo.png`}
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
        <span>Made by: 정노은, 김수진, 김정우</span>
        <br />
        <span>Copyright @ Kiri</span>
      </p>
    </Foot>
  );
};
