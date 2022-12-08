import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/Globalstyle';
import MainPage from './pages/MainPage';
import NoMatchPage from './pages/NoMatchPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
