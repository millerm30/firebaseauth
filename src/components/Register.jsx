import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "./Firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="flex align-center justify-center">
      <div className="flex flex-col text-center bg-[#dcdcdc] p-12 mt-12 rounded-xl shadow-md">
        <input
          type="text"
          className="p-2 text-lg mb-4 rounded-lg border-2 border-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="p-2 text-lg mb-4 rounded-lg border-2 border-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="p-2 text-lg mb-4 rounded-lg border-2 border-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="p-2 text-lg mb-4 border-none text-white bg-black rounded-lg"
          onClick={register}
        >
          Register
        </button>
        <button
          className="p-2 text-lg mb-4 border-none text-white bg-[#4285f4] rounded-lg"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
