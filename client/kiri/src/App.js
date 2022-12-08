import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/Globalstyle';
import MainPage from './pages/MainPage';
import NoMatchPage from './pages/NoMatchPage';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
