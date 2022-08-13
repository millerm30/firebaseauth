import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="flex align-center justify-center">
      <div className="flex flex-col text-center bg-[#dcdcdc] p-12">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="p12 text-lg mt-10 border-none text-white bg-black" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
