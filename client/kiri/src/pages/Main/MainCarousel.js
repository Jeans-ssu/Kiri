import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';

const data = [
  {
    eventId: 1,
    name: '이벤트 1',
    date: '2023_01_23',
    img: 'img',
  },
  {
    eventId: 2,
    name: '이벤트 2',
    date: '2023_01_23',
    img: 'img',
  },
  {
    eventId: 3,
    name: '이벤트 3',
    date: '2023_01_23',
    img: 'img',
  },
  {
    eventId: 4,
    name: '이벤트 4',
    date: '2023_01_23',
    img: 'img',
  },
  {
    eventId: 5,
    name: '이벤트 5',
    date: '2023_01_23',
    img: 'img',
  },
  {
    eventId: 6,
    name: '이벤트 6',
    date: '2023_01_23',
    img: 'img',
  },
];

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SlickSlider = styled.div`
  width: 90%;
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;

const EventImgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    padding: 10px;
  }
  position: relative;
  .fill,
  .date {
    position: absolute;
    top: 10;
    width: 90%;
    visibility: hidden;
  }
  .fill {
    background-color: ${({ theme }) => theme.colors.dark};
    opacity: 0.6;
    z-index: 100;
    height: 92%;
  }
  .date {
    z-index: 150;
    height: 100%;
    text-align: center;
    top: 45%;
    font-weight: 600;
    font-size: 22px;
  }
  :hover {
    .fill,
    .date {
      visibility: visible;
    }
  }
`;

const EventInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  .name {
    color: ${({ theme }) => theme.colors.dark};
  }
  .date {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 12px;
  }
`;

//TODO: D-day 날짜 계산
const MainCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const navigate = useNavigate();

  const handleOnClickEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <CarouselContainer>
      <SlickSlider>
        <Slider {...settings}>
          {data?.map((el) => {
            return (
              <EventContainer
                key={el.eventId}
                onClick={() => handleOnClickEvent(el.eventId)}
              >
                <EventImgContainer>
                  <div className="fill" />
                  <div className="date">D-10</div>
                  <img
                    src={process.env.PUBLIC_URL + '/img/event_cover.jpeg'}
                    alt="event cover"
                  />
                </EventImgContainer>
                <EventInfoContainer>
                  <div className="name">{el.name}</div>
                  <div className="date">{el.date}</div>
                </EventInfoContainer>
              </EventContainer>
            );
          })}
        </Slider>
      </SlickSlider>
    </CarouselContainer>
  );
};

export default MainCarousel;
