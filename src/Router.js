import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import AdminMain from './components/AdminMain';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />}>
      <Route path="admin" element={<AdminMain />}>

      </Route>
    </Route>
  )
);

export default Router;
