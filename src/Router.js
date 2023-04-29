import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminMain from './components/AdminMain';

const Router = () => {
  return (
    <BrowserRouter basename="/react-maru_project">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;