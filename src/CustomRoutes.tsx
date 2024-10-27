import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/chats',
    element: <Main />,
    errorElement: <div>에러 404</div>,
  },
]);

const CustomRoutes = () => {
  return <RouterProvider router={router} fallbackElement={<>로딩중..</>} />;
};

export default CustomRoutes;
