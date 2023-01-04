import { useState } from 'react';
import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventTitleInput from './EventTitleInput';

const EventWritePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 50px;
`;

const EventWritePage = () => {
  const [Title, setTitle] = useState('');

  return (
    <PageContainer header footer>
      <EventWritePageContainer>
        <EventTitleInput Title={Title} setTitle={setTitle} />
      </EventWritePageContainer>
    </PageContainer>
  );
};

export default EventWritePage;
