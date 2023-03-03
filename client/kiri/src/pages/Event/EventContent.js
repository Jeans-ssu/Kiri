import styled from 'styled-components';
import { BsFillSuitHeartFill } from 'react-icons/bs';

const dummydata = [
  {
    post_id: 1,
    title: 'title1',
    imgUrl:
      'https://spring-kiri-bucket.s3.ap-northeast-2.amazonaws.com/3080e4a7-97fc-4169-85ee-44cd31a819d3test2.jpg',
    startPostTime: '2022-11-25T12:10',
    scrap_count: 0,
  },

  {
    post_id: 2,
    title: 'title2',
    imgUrl:
      'https://spring-kiri-bucket.s3.ap-northeast-2.amazonaws.com/76a60188-d5cd-4510-bb16-8104fe20ef21test2.jpg',
    startPostTime: '2022-11-25T12:10',
    scrap_count: 0,
  },

  {
    post_id: 3,
    title: 'title3',
    imgUrl: null,
    startPostTime: '2022-11-25T12:10',
    scrap_count: 0,
  },

  {
    post_id: 4,
    title: 'title4',
    imgUrl: null,
    startPostTime: '2022-11-25T12:10',
    scrap_count: 0,
  },
];
//            Todo:  { data }
const EventContent = () => {
  // function dateFormat(date) {
  //   const dateFormat2 = date.getFullYear() + '-'+((date.getMonth()+1)<9?"0"+(date.getMonth()))
  //   }
  // const dday = (day) => {
  //   const today = new Date();
  //   console.log('tdoay', today);
  //   console.log('day', day);
  // };
  return (
    <Container>
      <EventListMain>
        {dummydata.map((el, idx) => (
          <EventContainer key={idx}>
            <EventList>
              <h4>{el.title}</h4>
              <p className="host">{el.post_id}</p>
              <div className="flex">
                <p className="dday">{el.startPostTime.slice(0, 10)}</p>
                <div className="flex">
                  <BsFillSuitHeartFill
                    className="eyeicon"
                    size="12"
                    color="#ff6b6b"
                  />
                  <p className="watch">{el.scrap_count}</p>
                </div>
              </div>
            </EventList>
            <EventImg>
              <img
                className="poster"
                alt="poster"
                //src={el.imgUrl}
                src={`${process.env.PUBLIC_URL}/poster.jpg`}
              ></img>
            </EventImg>
          </EventContainer>
        ))}
      </EventListMain>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const EventListMain = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const EventContainer = styled.div`
  width: 360px;
  height: 210px;
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  padding-left: 30px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const EventList = styled.div`
  justify-content: row;
  width: 200px;

  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
    cursor: pointer;
  }

  .host {
    font-size: 14px;
    color: #636363;
  }

  .dday {
    margin-top: 0;
    font-size: 12px;
    color: #59b89d;
  }

  .watch {
    margin-top: 0;
    font-size: 12px;
    color: #737373;
    margin-left: 3px;
  }

  .eyeicon {
    margin-left: 10px;
    margin-top: 2.8px;
    color: #737373;
  }
`;

const EventImg = styled.div`
  width: 150px;
  img {
    justify-content: column;
    width: 100%;
    top: 50%;
    left: 50%;
    position: absoulte;
    padding: 0 10px;
    cursor: pointer;
  }
`;

export default EventContent;
