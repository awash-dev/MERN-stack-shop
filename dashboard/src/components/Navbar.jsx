import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            store
          </Link>

          <div className="d-flex ms-auto" style={{ gap: "25px" }}>
            <div className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-black"
                to=""
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ marginLeft: "-60px" }}
              >
                <li>
                  <Link className="dropdown-item" to="/product">
                    product
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/create">
                    create product
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user">
                    users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
