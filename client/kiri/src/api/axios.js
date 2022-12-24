import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
//표준 CORS 요청은 기본적으로 쿠키를 설정하거나 보낼 수 없음
//withCredentials: true로 설정해서 수동으로 CORS 요청에 쿠키 값을 넣어줘야함
//서버도 응답 헤더에 Access-Control-Allow-Credentials을 true로 설정해줘야 함

export default instance;
