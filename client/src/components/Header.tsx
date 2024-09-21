import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logoSoolAi } from "../assets";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="w-full mx-auto sm:px-8 p-4 mb-1 h-fit flex justify-between items-center border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logoSoolAi} alt="Logo" className="w-28 md:w-56" />
      </Link>

      {location.pathname != "/create" && (
        <nav>
          <NavLink to="create" className="btn bg-secondary">
            Create
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
