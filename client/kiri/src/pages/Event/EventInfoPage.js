import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { FiShare2 } from 'react-icons/fi';
import { BsFillSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { setAuthHeader } from 'api/setAuthHeader';
import { selectAccessToken } from 'store/modules/authSlice';
import { useLocation } from 'react-router-dom';
// const jwtToken = localStorage.getItem('Authorization');
// const headers = {
//   Authorization: jwtToken,
// };

const EventInfoPage = () => {
  // 나중에 이미지 배열로 수정 필요
  const posters = [
    `${process.env.PUBLIC_URL}/img/event_cover.jpeg`,
    `${process.env.PUBLIC_URL}/poster.jpg`,
    `${process.env.PUBLIC_URL}/img/event_cover.jpeg`,
    `${process.env.PUBLIC_URL}/poster.jpg`,
  ];
  const [mark, setMark] = useState(false);
  const [data, setData] = useState({
    post_id: 0,
    member_id: 0,
    title: '',
    scrap_count: 0,
    content: '',
    event: '',
    local: '',
    school: '',
    organizer: '',
    contactNumber: null,
    link: null,
    place: null,
    savedImgList: [],
    startPostTime: '',
    //01234567890123456789
    finishPostTime: '',
  });

  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const markHandler = () => {
    setMark(!mark);
  };

  console.log('pre Url', useLocation().pathname);
  const preID = useLocation().pathname.substring(7);
  console.log('ID', preID);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`/posts/read/${preID}`);
      const resdata = response.data;
      setData(resdata);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const scrap = () => {
    axios
      .post(`/extra/${preID}`, {
        startScrapTime:
          data.startPostTime.slice(0, 10) +
          ' ' +
          data.startPostTime.slice(11, 19),
        endScrapTime:
          data.finishPostTime.slice(0, 10) +
          ' ' +
          data.finishPostTime.slice(11, 19),
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const DDay = (expiry_date) => {
    const now = new Date(); // 2022-11-25
    const target = new Date(
      expiry_date.slice(0, 4),
      MakeDay(expiry_date.slice(5, 7)) - 1,
      MakeDay(expiry_date.slice(8, 10))
    );
    const distance = target.getTime() - now.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day + 1;
  };
  const MakeDay = (data) => {
    if (data.indexOf('0') === 0) {
      return data.slice(1, 2);
    } else {
      return data;
    }
  };

  return (
    <PageContainer header footer>
      <EventInfoContainer>
        <EventTopdiv>
          <EventUpdiv>
            <div className="left">
              <EventTitlediv>
                <h1>{data.title}</h1>
              </EventTitlediv>
              <EventSharediv>
                <FiShare2 size="27" />
              </EventSharediv>
            </div>
            <EventBookmarkdiv onClick={() => markHandler()}>
              {mark ? (
                <BsFillSuitHeartFill
                  onClick={scrap}
                  size="27"
                  color="#ff6b6b"
                />
              ) : (
                <BsSuitHeart onClick={scrap} size="27" />
              )}
            </EventBookmarkdiv>
          </EventUpdiv>
          <EventPerioddiv>
            <EventDdaydiv>
              D-{DDay(data.startPostTime.slice(0, 10))}
            </EventDdaydiv>
            <EventWriterdiv>{data.organizer}</EventWriterdiv>
            <EventTimediv>
              <div className="start">
                {data.startPostTime.slice(0, 10)}
                &nbsp;
                {data.startPostTime.slice(11, 19)}
              </div>
              <div className="finish">
                {data.startPostTime.slice(0, 10) ===
                data.finishPostTime.slice(0, 10) ? (
                  <div>&nbsp;~&nbsp;{data.finishPostTime.slice(11, 19)}</div>
                ) : (
                  <div>
                    &nbsp;~&nbsp;
                    {data.finishPostTime.slice(0, 10)}&nbsp;
                    {data.finishPostTime.slice(11, 19)}
                  </div>
                )}
              </div>
            </EventTimediv>
          </EventPerioddiv>
        </EventTopdiv>
        <EventContentdiv>
          <EventPosterdiv>
            {/** Todo: 이미지 넣기 */}
            <Slider {...settings}>
              {posters.map((el, idx) => {
                return (
                  <div key={idx}>
                    <img alt="poster" key={idx} src={el}></img>
                  </div>
                );
              })}
            </Slider>
          </EventPosterdiv>
          <EventInfodiv>
            <article>{data.content}</article>
          </EventInfodiv>
        </EventContentdiv>
      </EventInfoContainer>
    </PageContainer>
  );
};

const EventInfoContainer = styled.div`
  padding: 0 40px 40px 40px;
`;

const EventTopdiv = styled.div``;

const EventUpdiv = styled.div`
  display: flex;
  .left {
    display: flex;
  }

  .icon {
    line-height: 40px;
  }
`;

const EventTitlediv = styled.div`
  h1 {
    margin: 0;
  }
`;

const EventSharediv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

const EventBookmarkdiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
`;

const EventPerioddiv = styled.div`
  display: flex;
  font-size: 18px;
`;

const EventDdaydiv = styled.div``;

const EventWriterdiv = styled.div`
  margin-left: 15px;
`;

const EventTimediv = styled.div`
  margin-left: auto;
  display: flex;
`;

const EventContentdiv = styled.div`
  display: flex;
  margin-top: 30px;
`;

const EventPosterdiv = styled.div`
  width: 400px;
  img {
    width: 400px;
  }
`;

const EventInfodiv = styled.div`
  margin-left: 40px;
`;

export default EventInfoPage;
