import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';

import Header from "../header/Header";
import NewOrdersPage from '../../pages/NewOrdersPage';
import HistoryPage from '../../pages/HistoryPage';
import UsersPage from '../../pages/UsersPage';
import ChangeRatePage from '../../pages/ChangeRatePage';
import UserInfoPage from '../../pages/UserInfoPage';
import UserEditInfoPage from '../../pages/UserEditInfoPage';
import LoginPage from '../../pages/LoginPage';
import UserCreatePage from '../../pages/UserCreatePage';
import CommentsPage from '../../pages/CommentsPage';


function App() {
  const token = sessionStorage.getItem('access-token');

  if (!token) {
    return <LoginPage />
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<NewOrdersPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserInfoPage />} />
            <Route path="/user/:id/edit" element={<UserEditInfoPage />} />
            <Route path="/user/create" element={<UserCreatePage />} />
            <Route path="/comments" element={<CommentsPage/>}/>
            <Route path="/change-rate" element={<ChangeRatePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
