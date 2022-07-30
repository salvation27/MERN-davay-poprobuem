import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // для вспівашек toast
  const { status } = useSelector((state) => state.auth);


  // выводим сообщения из бекенда  из поля message

  useEffect(() => {
    if (status) {
      toast(`${status}`);
    }
    if (isAuth) navigate("/");
  }, [status, navigate, isAuth]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/3 m-auto">
      <div className="text-center pt-11 text-4xl pb-4">RegisterPage</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="line"></div>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Passwors"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center mt-3">
          <Button onClick={handleSubmit} type="submit" variant="contained">
            Register
          </Button>
          <div>
            Зарегистрироваться<Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
