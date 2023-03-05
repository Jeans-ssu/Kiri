import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { FiShare2 } from 'react-icons/fi';
import { BsFillSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from '../../api/axios';

const EventInfoPage = ({ id }) => {
  // 나중에 이미지 배열로 수정 필요
  const posters = [
    `${process.env.PUBLIC_URL}/img/event_cover.jpeg`,
    `${process.env.PUBLIC_URL}/poster.jpg`,
    `${process.env.PUBLIC_URL}/img/event_cover.jpeg`,
    `${process.env.PUBLIC_URL}/poster.jpg`,
  ];
  const [mark, setMark] = useState(false);
  const [data, setData] = useState({
    post_id: 1,
    member_id: 1,
    title: '혜안',
    scrap_count: 0,
    content: '혜안져스 라이어 게임',
    event: '축제',
    local: '서울',
    school: '숭실대학교',
    organizer: '주최자는 나야 둘이 될 수 없어',
    contactNumber: null,
    link: null,
    place: null,
    savedImgList: [
      'https://spring-kiri-bucket.s3.ap-northeast-2.amazonaws.com/522ae7eb-9ca0-457b-9d61-007fb9f1b9d1test2.jpg',
    ],
    startPostTime: '2022-11-25T12:10:00',
    finishPostTime: '2022-11-25T12:30:00',
  });

  const markHandler = () => {
    setMark(!mark);
  };

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
      const response = await axios.get(`/posts/read/${id}`);
      const resdata = response.data;
      setData(resdata);
    } catch (error) {
      console.error('Error: ', error);
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
                <BsFillSuitHeartFill size="27" color="#ff6b6b" />
              ) : (
                <BsSuitHeart size="27" />
              )}
            </EventBookmarkdiv>
          </EventUpdiv>
          <EventPerioddiv>
            <EventDdaydiv>D-??</EventDdaydiv>
            <EventWriterdiv>{data.organizer}</EventWriterdiv>
            <EventTimediv>{data.startPostTime}</EventTimediv>
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
