import React from "react";
import logo from "../assets/zodiacailogo.jpg";
import Image from "next/image";

const Navbar = () => {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <nav className="navbar fixed-top  navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-center">
          <a className="navbar-brand" href="#">
            <Image src={logo} alt="Zodiac AI Logo" width={50} height={50} />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
