import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
//import { FiShare2 } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { setAuthHeader } from 'api/setAuthHeader';
import { selectAccessToken } from 'store/modules/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUserInfo } from 'store/modules/userSlice';
import PostRemoveModal from 'components/PostRemoveModal';
import theme from 'styles/theme';
import { Recommends } from './Recommends';

const { yellow, blue, pink, orange, purple2, green_1 } = theme.colors;

const EventInfoPage = () => {
  const navigate = useNavigate();
  const preID = useLocation().pathname.substring(7);
  const loginID = useSelector(selectUserInfo);

  const [tagList, setTagList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    finishPostTime: '',
  });
  const [recommended, setRecommended] = useState([]);

  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

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
      const response = await axios.get(`/posts/read/${preID}`);
      const resdata = response.data;
      setData(resdata.data);
      setMark(resdata.data.scrap);
      setRecommended(response.data.dataList);
      setTagList(resdata.data.tagList);
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
    const now = new Date();
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

  const HandleDelete = () => {
    axios.delete(`/api/posts/${preID}`).then(() => {
      navigate(`/event`);
    });
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
              <EventTagBox tag={data.event}>{data.event}</EventTagBox>
            </div>
            <EventBookmarkdiv onClick={() => markHandler()}>
              {mark ? (
                <AiFillHeart onClick={scrap} size="27" color="#ff6b6b" />
              ) : (
                <AiOutlineHeart onClick={scrap} size="27" />
              )}
            </EventBookmarkdiv>
          </EventUpdiv>
          <EventPerioddiv>
            <EventDdaydiv>
              D
              {DDay(data.startPostTime.slice(0, 10)) < 0
                ? '+' + Math.abs(DDay(data.startPostTime.slice(0, 10)))
                : '-' + DDay(data.startPostTime.slice(0, 10))}
            </EventDdaydiv>
            <EventWriterdiv>{data.organizer}</EventWriterdiv>
            <EventTimediv>
              <div className="start">{data.startPostTime.slice(0, 10)}</div>
              <div className="finish">
                {data.startPostTime.slice(0, 10) ===
                data.finishPostTime.slice(0, 10) ? (
                  ''
                ) : (
                  <div>
                    &nbsp;~&nbsp;
                    {data.finishPostTime.slice(0, 10)}
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
              {data?.savedImgList?.map((el, idx) => {
                return (
                  <div key={idx}>
                    <img alt="poster" key={idx} src={el}></img>
                  </div>
                );
              })}
            </Slider>
          </EventPosterdiv>
          <EventInfodiv>
            <DetailInfoBox>
              <table>
                <tbody>
                  <tr>
                    <td className="title">주최</td>
                    <td className="info">{data.organizer}</td>
                  </tr>
                  <tr>
                    <td className="title">이메일</td>
                    <td className="info">{data.email}</td>
                  </tr>
                  <tr>
                    <td className="title">지역</td>
                    <td className="info">{data.local}</td>
                  </tr>
                  <tr>
                    <td className="title">장소</td>
                    <td className="info">{data.place}</td>
                  </tr>
                  <tr>
                    <td className="title">학교</td>
                    <td className="info">{data.school}</td>
                  </tr>
                  <tr>
                    <td className="title">시간</td>
                    <td className="info">
                      {data.startPostTime.slice(11, 16)}&nbsp;~&nbsp;
                      {data.finishPostTime.slice(11, 16)}
                    </td>
                  </tr>
                  <tr>
                    <td className="title">태그</td>
                    <td className="info">
                      <TagsContainer>
                        {tagList?.map((el, idx) => {
                          return <Tag key={idx}>{el}</Tag>;
                        })}
                      </TagsContainer>
                    </td>
                  </tr>
                </tbody>
              </table>
            </DetailInfoBox>
            <hr />
            <InfoBox>
              <span>상세 내용</span>
              <article>
                {data.content
                  ?.replace(/(?:\r\n|\n)/g, '\r\n')
                  .split('\r\n')
                  .map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
              </article>
            </InfoBox>
          </EventInfodiv>
        </EventContentdiv>
        {data.member_id === loginID.memberId ? (
          <EditBox>
            <EditBtn
              onClick={() => {
                navigate(`/event/${data.post_id}/edit`);
              }}
            >
              수정
            </EditBtn>
            <DeleteBtn
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              삭제
            </DeleteBtn>
            <PostRemoveModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              HandleDelete={HandleDelete}
            />
          </EditBox>
        ) : (
          ''
        )}
        <Recommends recommended={recommended} />
      </EventInfoContainer>
    </PageContainer>
  );
};

const EventTagBox = styled.div`
  background-color: ${(props) =>
    props.tag === '축제'
      ? yellow
      : props.tag === '전시'
      ? blue
      : props.tag === '공연'
      ? pink
      : props.tag === '강연'
      ? orange
      : props.tag === '대회'
      ? purple2
      : green_1};
  font-size: 12px;
  color: white;
  font-weight: 600;
  width: 40px;
  height: 24px;
  line-height: 24px;
  //height: 22px;
  //display: flex;
  text-align: center;
  margin-bottom: 5px;
  border-radius: 12px;
  margin: auto 10px;
`;

// const EventTagSpan = styled.span`
//   margin: auto;
// `;

const EditBox = styled.div`
  display: flex;
  height: 50px;
`;

const EditBtn = styled.button`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.darkgray};
  margin-top: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: underline;
`;

const DeleteBtn = styled.button`
  margin-top: 20px;
  margin-left: 10px;
  width: 45px;
  height: 30px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  color: white;
`;

const EventInfoContainer = styled.div`
  padding: 0 40px 0 40px;
  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }
`;

const EventTopdiv = styled.div``;

const EventUpdiv = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex: 1;
  }

  .icon {
    line-height: 40px;
  }
`;

const EventTitlediv = styled.div`
  width: 90%;
  h1 {
    margin: 0;
    @media screen and (max-width: 767px) {
      font-size: 20px;
    }
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  @media screen and (max-width: 767px) {
    //width: 260px;
  }
`;

// const EventSharediv = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 20px;
//   cursor: pointer;
// `;

const EventBookmarkdiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  @media screen and (max-width: 767px) {
    margin-left: 5px;
  }
`;

const EventPerioddiv = styled.div`
  display: flex;
  font-size: 16px;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    font-size: 14px;
  }
`;

const EventDdaydiv = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainColor};
  @media screen and (max-width: 767px) {
    margin-bottom: 5px;
  }
`;

const EventWriterdiv = styled.div`
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 767px) {
    margin: 0;
    margin-bottom: 5px;
  }
`;

const EventTimediv = styled.div`
  margin-left: auto;
  display: flex;
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 767px) {
    margin: 0;
    flex-direction: column;
    margin-bottom: 5px;
  }
`;

const EventContentdiv = styled.div`
  display: flex;
  margin-top: 30px;
  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
`;

const EventPosterdiv = styled.div`
  width: 400px;
  img {
    width: 400px;
  }
  @media screen and (max-width: 767px) {
    img {
      width: 100%;
    }
    margin: auto;
    width: 100%;
  }
`;

const EventInfodiv = styled.div`
  margin-left: 40px;
  hr {
    width: 504px;
  }

  @media screen and (max-width: 767px) {
    margin-top: 35px;
    margin-left: 0;
    font-size: 14px;
    hr {
      margin-left: 0;
      width: 100%;
    }
  }
`;

const DetailInfoBox = styled.div`
  td.info {
    padding-left: 20px;
  }

  td.title {
    font-weight: 600;
    width: 43.52px;
  }
  td {
    padding-bottom: 10px;
    height: 27px;
    margin: auto 0;
  }
`;

const InfoBox = styled.div`
  margin-top: 15px;
  span {
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 700;
    font-size: 18px;
  }

  span {
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
  }
  @media screen and (max-width: 767px) {
    span {
      font-size: 16px;
    }
    p {
      font-size: 12px;
      margin-top: 10px;
    }
  }
`;

const TagsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  min-height: 20px;
  align-items: center;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.darkgray};
  border: 1px solid ${({ theme }) => theme.colors.mainColor};

  padding: 5px 10px;
  font-size: 14px;
  border-radius: 15px;
  margin: 2px 8px 2px 0px;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

export default EventInfoPage;
