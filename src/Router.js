import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import app from './util/firebase/firebaseApp';

import Login from './components/Login';
import AdminMain from './components/AdminMain';
import Error from './components/Error';
import DetailWork from './components/DetailWork';

const Router = () => {
  useEffect(() => {
    app();
  }, [])
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/complete" element={<Login />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/list" element={<AdminMain />} />
        <Route path="/user/:workId" element={<DetailWork />} />
        <Route path="/*" element={Error} />
      </Routes>
    </HashRouter>
  );
};

export default Router;