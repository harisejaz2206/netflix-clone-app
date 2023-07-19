import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect the user to the login page after logging out
      window.location.href = "/login";
    } catch (error) {
      // Handle any errors that may occur during the logout process
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">Account</button>
          </Link>
          <button
            className="bg-red-600 px-6 py-4 rounded cursor text-white"
            onClick={handleLogout} // Call handleLogout on button click
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="signup">
            <button className="bg-red-600 px-6 py-4 rounded cursor text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
