import React from "react";
import { Link, NavLink } from "react-router-dom";
import { mainNavs } from "../constants";
import { logoSoolAi } from "../assets";

const Header: React.FC = () => {
  return (
    <header className="w-full mx-auto sm:px-8 p-4 mb-1 h-fit flex justify-between items-center border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logoSoolAi} alt="Logo" className="w-28 md:w-56" />
      </Link>

      <nav>
        {mainNavs?.map((nav) => (
          <NavLink
             key={nav.id} 
             to={nav.to} 
             className="btn bg-secondary">
            {nav.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
