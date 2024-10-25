import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import Main from './pages/Main';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
