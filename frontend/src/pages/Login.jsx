import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const from = location.state?.from || "/";

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Incorrect email use @gmail.com");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Signup successful!");
          setName("");
          setEmail("");
          setPassword("");
          navigate(from);
        } else {
          toast.error(response.data.message || "Signup failed");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
          setEmail("");
          setPassword("");
          navigate(from);
        } else {
          toast.error("Invalid email or password");
        }
      }
    } catch (error) {
      console.log("Auth Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token && location.pathname === "/login" && !location.state?.from) {
      navigate("/");
    }
  }, [token, location]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96  m-auto mt-14 gap-4 text-gray-800"
      autoComplete="off"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        name="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="@gmail.com"
        autoComplete="off"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        name="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your password"
        autoComplete="new-password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" && (
          <p className="cursor-pointer">Forget your password?</p>
        )}
        <p
          className="cursor-pointer"
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
        >
          {currentState === "Login"
            ? "Create an account"
            : "Already have an account? Login"}
        </p>
      </div>

      <button className="bg-black text-white py-2 px-8 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
