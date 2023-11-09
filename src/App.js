import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Login/LoginPage";
import LoginSettingsPage from "./pages/Login/LoginSettingsPage";
import KakaoLoginPage from "./pages/Login/KakaoLoginPage";

import CreatePlogPage from "./pages/Plogging/CreatePlogPage";
import PloggingListPage from "./pages/Plogging/PloggingListPage";
import PloggingDetailPage from "./pages/Plogging/PloggingDetailPage";

import UserReportPage from "./pages/User/UserReportPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import ReviewPage from "./pages/User/ReviewPage";
import AlarmPage from "./pages/User/AlarmPage";
import EventPage from "./pages/Event/EventPage";
import TrashMapPage from "./pages/TrashMap/TrashMapPage";

import MyPage from "./pages/MyPage/MyPage";
import MyInterestPage from "./pages/MyPage/MyInterestPage";
import MyCommentPage from "./pages/MyPage/MyCommentPage";
import MySchedulePage from "./pages/MyPage/MySchedulePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login-settings" element={<LoginSettingsPage />} />
      <Route path="/kakao-login" element={<KakaoLoginPage />} />

      <Route path="create-plogging" element={<CreatePlogPage />} />
      <Route path="/plogging-list" element={<PloggingListPage />} />
      <Route path="/plogging-detail/:id" element={<PloggingDetailPage />} />

      <Route path="user-report" element={<UserReportPage />} />
      <Route path="user-profile/:id" element={<UserProfilePage />} />

      <Route path="/review/:id" element={<ReviewPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/trash-map" element={<TrashMapPage />} />

      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/interest" element={<MyInterestPage />} />
      <Route path="/mypage/comment" element={<MyCommentPage />} />
      <Route path="/mypage/schedule" element={<MySchedulePage />} />
    </Routes>
  );
}

export default App;
