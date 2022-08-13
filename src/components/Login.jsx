import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (loading) {
        return;
      }
      if (user) navigate("/dashboard");
    }, [user, loading]);

  return (
    <div className="flex flex-col align-center justify-center w-fit mx-auto">
      <div>
        <h1 className="text-2xl text-center my-6">Firebase Auth Testing</h1>
      </div>
      <div className="flex flex-col text-center bg-[#dcdcdc] p-12 rounded-xl shadow-md">
        <input
          type="text"
          className="p-2 text-lg mb-4 rounded-lg border-2 border-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="p-2 text-lg mb-6 rounded-lg border-2 border-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="p-2 text-lg mb-4 border-none text-white bg-black rounded-lg"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          className="p-2 text-lg mb-4 border-none text-white bg-[#4285f4] rounded-lg"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login