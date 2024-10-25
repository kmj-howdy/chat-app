import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import Main from './pages/Main';
import request from './utils/request';

function App() {
  useEffect(() => {
    // 예시를 위한 코드 입니다. (지우셔도 무방합니다.)
    request.get('/test').then((res) => console.log(res));
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
