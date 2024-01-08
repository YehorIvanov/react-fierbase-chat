import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { UserContext } from '../context';
const AppRouter = () => {
  const { user } = useContext(UserContext);
  return user ? (
    <Routes>
      {privateRoutes.map(({ path, element }) => {
        return <Route path={path} key={path} element={element} />;
      })}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element }) => {
        return <Route path={path} key={path} element={element} />;
      })}
    </Routes>
  );
};

export default AppRouter;
