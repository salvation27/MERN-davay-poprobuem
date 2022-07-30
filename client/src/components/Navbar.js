import React, { useEffect,useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import {toast} from 'react-toastify'

const Navbar = () => {
    const dispatch = useDispatch();
  const [user,setUser] =useState(null)
  const isAuth = useSelector(checkIsAuth);
  const dataUser = useSelector((state) => state.auth.user);
  // делаем активную страницу -подсвечиваем меню
  const activeStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли с системы");
  };

  useEffect(() => {
    setUser(dataUser);
  }, [isAuth, dataUser]);

  return (
    <div className="navbar flex justify-between items-center">
      <Link to="/">
        <div>logo</div>
      </Link>
      <ul className="flex gap-2">
        <li className="hover:text-red-500">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        {!isAuth && (
          <>
            <li className="hover:text-red-500">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="hover:text-red-500">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/register"
              >
                register
              </NavLink>
            </li>
          </>
        )}
        <li className="hover:text-red-500">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to="/posts"
          >
            Posts
          </NavLink>
        </li>
        {isAuth && (
          <>
            <li className="hover:text-red-500">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/add"
              >
                Add Post
              </NavLink>
            </li>
            <li className="hover:text-red-500">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                // to={`/post/edit/${_id}`}
                to="/add"
              >
                Edit Post
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {!isAuth ? (
        <Link to="/login">
          <div className="px-3 py-1 bg-gray-600 text-white  duration-300 hover:bg-gray-200 hover:text-gray-600 cursor-pointer">
            Войти
          </div>
        </Link>
      ) : (
        <>
          <div>
            {user ? (
              <div className="w-10 uppercase text-2xl flex items-center justify-center h-10 bg-gray-200">
                {user.username[0]}
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={logoutHandler}
            className="px-3 py-1 bg-gray-600 text-white  duration-300 hover:bg-gray-200 hover:text-gray-600 cursor-pointer"
          >
            Выйти
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
