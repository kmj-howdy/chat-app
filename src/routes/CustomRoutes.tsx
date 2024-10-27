import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { chatLoader } from './chatLoader';

const Main = lazy(() => import('@/pages/Main'));
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
        loader: async ({ params }) => {
          try {
            const response = await chatLoader(params.chatId);
            return response;
          } catch (error) {
            console.error('ChatScreen loader 에러', error);
            alert('존재하지 않는 대화 내역으로, 초기 화면으로 이동합니다.');
            return redirect('/chats');
          }
        },
      },
    ],
  },
]);

const CustomRoutes = () => {
  return <RouterProvider router={router} fallbackElement={<>로딩중..</>} />;
};

export default CustomRoutes;
