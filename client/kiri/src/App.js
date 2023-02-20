import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/Globalstyle';
import MainPage from 'pages/Main/MainPage';
import NoMatchPage from 'pages/NoMatchPage';
// import EventFieldPage from 'pages/Event/EventFieldPage';
// import EventKeywordPage from 'pages/Event/EventKeywordPage';
import EventInfoPage from 'pages/Event/EventInfoPage';
import EventSearchPage from 'pages/Event/EventSearchPage';
import SignupPage from 'pages/Signup/SignupPage';
import SigninPage from 'pages/Signin/SigninPage';
import Mypage from 'pages/Mypage/Mypage';
import EventWritePage from 'pages/EventWrite/EventWritePage';
import ReduxPage from 'pages/reduxPage';
import EventPage from 'pages/Event/EventPage';
import EventRegion from 'pages/Event/EventRegion';
import PasswordChangePage from 'pages/PasswordChange/PasswordChangePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="*" element={<NoMatchPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/event/region" element={<EventRegion />} />
          <Route path="/event/:eventId" element={<EventInfoPage />} />
          <Route path="/event/search" element={<EventSearchPage />} />
          <Route path="/event/write" element={<EventWritePage />} />
          <Route path="/redux" element={<ReduxPage />} />
          <Route path="/passwordchange" element={<PasswordChangePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
