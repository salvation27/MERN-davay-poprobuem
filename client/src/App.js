import { Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from './pages/EditPostPage'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";

function App() {
  // делаем проверку есть ли токен у пользователя (зарегин)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/posts" element={<PostsPage />} />
        <Route exact path="/post/:id" element={<PostPage />} />
        <Route exact path="/add" element={<AddPostPage />} />
        <Route exact path="/post/edit/:id" element={<EditPostPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
