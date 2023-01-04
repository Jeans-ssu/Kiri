import { useState } from 'react';
import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventTitleInput from './EventTitleInput';
import EventInfoInput from './EventInfoInput';
import EventExplainInput from './EventExplainInput';

const EventWritePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 50px;
`;

const EventWritePage = () => {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState({
    host: '',
    type: '',
    field: '',
    date: '',
    time: '',
    location: '',
  });
  const [explain, setExplain] = useState('');

  return (
    <PageContainer header footer>
      <EventWritePageContainer>
        <EventTitleInput title={title} setTitle={setTitle} />
        <EventInfoInput info={info} setInfo={setInfo} />
        <EventExplainInput explain={explain} setExplain={setExplain} />
      </EventWritePageContainer>
    </PageContainer>
  );
};

export default EventWritePage;
