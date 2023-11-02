import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginSettingsPage from "./pages/LoginSettingsPage";
function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="login-settings" element={<LoginSettingsPage />} />
    </Routes>
  );
}

export default App;
