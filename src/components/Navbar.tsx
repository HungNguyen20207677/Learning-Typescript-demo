import React, { FC } from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

interface NavbarProps {
  isLoginPage?: boolean;
}

const Navbar: FC<NavbarProps> = ({ isLoginPage = false }) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            {isLoginPage ? (
              <div className="flex flex-shrink-0 items-center mr-4">
                <img className="h-10 w-auto" src={logo} alt="React exercise" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  React Exercise
                </span>
              </div>
            ) : (
              <NavLink
                className="flex flex-shrink-0 items-center mr-4"
                to="/home"
              >
                <img className="h-10 w-auto" src={logo} alt="React exercise" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  React Exercise
                </span>
              </NavLink>
            )}

            {isLoginPage ? (
              <></>
            ) : (
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink to="/home" className={linkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/categories" className={linkClass}>
                    Categories
                  </NavLink>
                  <NavLink to="/add-category" className={linkClass}>
                    Add Category
                  </NavLink>
                  <button
                    onClick={handleClick}
                    className=" text-white hover:bg-red-700 hover:text-white rounded-md px-3 py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
