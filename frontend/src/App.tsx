import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallback from "./pages/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/ChatPage";
import AlbumPage from "./pages/AlbumPage";
import AdminPage from "./pages/AdminPage";
import { Toaster } from "./components/ui/sonner";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={'/auth-callback'} />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}