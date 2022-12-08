import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';

const NoMatchPageContainer = styled.div``;

const NoMatchPage = () => {
  return (
    <PageContainer header footer>
      <NoMatchPageContainer>
        <div>알 수 없는 페이지</div>
      </NoMatchPageContainer>
    </PageContainer>
  );
};

export default NoMatchPage;
