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
import NotificationPage from "./pages/User/NotificationPage";
import EventPage from "./pages/Event/EventPage";
import TrashMapPage from "./pages/TrashMap/TrashMapPage";

import MyPage from "./pages/MyPage/MyPage";
import MyPageUpdate from "./pages/MyPage/MyPageUpdate";
import MyInterestPage from "./pages/MyPage/MyInterestPage";
import MyCommentPage from "./pages/MyPage/MyCommentPage";
import MySchedulePage from "./pages/MyPage/MySchedulePage";

import { PrivateRoute, PrivateRouteTemp } from "./router/PrivateRoute";


function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        {/*로그인 시 접근 가능한 페이지 */}
        <Route path="/create-plogging" element={<CreatePlogPage />} />
        <Route path="/plogging-detail/:id" element={<PloggingDetailPage />} />

        <Route path="/user-report/:id" element={<UserReportPage />} />
        <Route path="/user-profile/:id" element={<UserProfilePage />} />

        <Route path="/review/:memberId/:postId" element={<ReviewPage />} />
        <Route path="/notifications" element={<NotificationPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/update" element={<MyPageUpdate />} />
        <Route path="/mypage/interest" element={<MyInterestPage />} />
        <Route path="/mypage/comment" element={<MyCommentPage />} />
        <Route path="/mypage/schedule" element={<MySchedulePage />} />
      </Route>

      <Route element={<PrivateRouteTemp />}>
        {/*회원가입 중도 이탈자 & 회원가입 진행중인 유저만 접근 가능한 페이지 */}
        <Route path="/login-settings" element={<LoginSettingsPage />} />
      </Route>

      <Route path="/" element={<MainPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/kakao-login" element={<KakaoLoginPage />} />
      <Route path="/plogging-list" element={<PloggingListPage />} />

      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/trash-map" element={<TrashMapPage />} />
    </Routes>
  );
}

export default App;
