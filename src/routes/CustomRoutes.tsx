import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../pages/Main';
import { lazy } from 'react';

const NewChatScreen = lazy(() => import('@/components/NewChatScreen'));
const ExistChatScreen = lazy(() => import('@/components/ExistChatScreen'));

const router = createBrowserRouter([
  {
    path: '/chats',
    element: <Main />,
    errorElement: <div>에러 404</div>,
    children: [
      { path: '/chats', element: <NewChatScreen /> },
      {
        path: ':chatId',
        element: <ExistChatScreen />,
      },
    ],
  },
]);

const CustomRoutes = () => {
  return <RouterProvider router={router} fallbackElement={<>로딩중..</>} />;
};

export default CustomRoutes;
