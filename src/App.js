import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import LoginSettingsPage from "./pages/Login/LoginSettingsPage";
import CreatePlogPage from "./pages/Plogging/CreatePlogPage";
import PloggingListPage from "./pages/Plogging/PloggingListPage";
import PloggingDetailPage from "./pages/Plogging/PloggingDetailPage";
import UserReportPage from "./pages/User/UserReportPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import MainPage from "./pages/Main/MainPage";
// import KakaoLoginPage from "./pages/Login/KakaoLoginPage";
import ReviewPage from "./pages/User/ReviewPage";
import AlarmPage from "./pages/User/AlarmPage";
function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="login-settings" element={<LoginSettingsPage />} />
      <Route path="create-plogging" element={<CreatePlogPage />} />
      <Route path="/plogging-list" element={<PloggingListPage />} />
      <Route path="/plogging-detail/:id" element={<PloggingDetailPage />} />
      <Route path="user-report" element={<UserReportPage />} />
      <Route path="user-profile/:id" element={<UserProfilePage />} />
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/kakao-login" element={<KakaoLoginPage />} /> */}
      <Route path="/review/:id" element={<ReviewPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
    </Routes>
  );
}

export default App;
