import React from 'react'
import { NavLink } from 'react-router-dom'


const NavbarComponent = () => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <NavLink className="nav-link" to="/">
            หน้าแรก
          </NavLink>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <NavLink className="nav-link" to="/create">
            เขียนบทความ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent