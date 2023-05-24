import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
// import MainCarousel from './MainCarousel';
// import MainEvents from './MainEvents';
// import SelectedEvents from './SelectedEvents';
// import BestEvents from './BestEvents';

const MainPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const MainPageHeader = styled.div`
//   width: 90%;
//   margin-bottom: 15px;
//   font-size: 22px;
//   color: ${({ theme }) => theme.colors.darkgray};
//   font-weight: 600;
//   .big {
//     font-size: 24px;
//   }
//   .green_3 {
//     color: ${({ theme }) => theme.colors.green_3};
//   }
//   .green {
//     color: ${({ theme }) => theme.colors.mainColor};
//   }
// `;

const MainPage = () => {
  return (
    <PageContainer header footer padding="0">
      <MainPageContainer>
        {/* <MainPageHeader>
          <span className="big">
            모든 <span className="green_3">대학생 행사 정보</span>를 한눈에
          </span>{' '}
          - 이제 <span className="green">끼리끼리</span> 모이자!
        </MainPageHeader> */}
        <ImgContainer>
          <img
            src={process.env.PUBLIC_URL + '/img/kiri_main.png'}
            alt="메인 이미지"
          />
        </ImgContainer>
        {/* <MainCarousel />
        <MainEvents />
        <SelectedEvents />
        <BestEvents /> */}
      </MainPageContainer>
    </PageContainer>
  );
};

const ImgContainer = styled.div`
  img {
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainPage;
