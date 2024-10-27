import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import CustomRoutes from '@/routes/CustomRoutes';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CustomRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
