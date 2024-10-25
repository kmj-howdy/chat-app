import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import Main from './pages/Main';

function App() {
  useEffect(() => {
    // 예시를 위한 코드 입니다. (지우셔도 무방합니다.)
    fetch('/test')
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

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
