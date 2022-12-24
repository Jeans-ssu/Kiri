import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/Globalstyle';
import MainPage from 'pages/Main/MainPage';
import NoMatchPage from 'pages/NoMatchPage';
import EventFieldPage from 'pages/Event/EventFieldPage';
import SignupPage from 'pages/Signup/SignupPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NoMatchPage />} />
          <Route path="/event" element={<EventFieldPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
