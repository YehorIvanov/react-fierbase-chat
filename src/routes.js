import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/consts';
import Login from './components/Login';
import Chat from './components/Chat';
import NotFound from './components/NotFound';

export const publicRoutes = [
  { path: LOGIN_ROUTE, element: <Login /> },
  { path: '/', element: <Login /> },
  { path: '*', element: <NotFound /> },
];
export const privateRoutes = [
  { path: CHAT_ROUTE, element: <Chat /> },
  { path: '*', element: <NotFound /> },
  { path: '/', element: <Chat /> },
  { path: LOGIN_ROUTE, element: <Chat /> },
];
