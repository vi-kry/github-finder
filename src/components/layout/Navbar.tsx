import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NavbarProps {
  title: string;
}

function Navbar({ title }: NavbarProps): JSX.Element {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <Link to="/" className="text-lg fond-bold align-middle">
            {title}
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const defaultProps: NavbarProps = {
  title: "Github Finder",
};

Navbar.defaultProps = defaultProps;

export default Navbar;
