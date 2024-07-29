import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';

const NavigationBar: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  return (
    <nav className="navbar bg-dark border-bottom navbar-expand-lg border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className={"navbar-brand"} to={"/"}>React blog</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={"nav-link"} to={"/"}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"nav-link"} to={"/articles"}>Articles</NavLink>
            </li>
            <li>
              <NavLink className={"nav-link"} to={"/about"}>About </NavLink>
            </li>
          </ul>
          {user?.email}
          {user
            ? <button className='btn btn-danger' onClick={() => { signOut(getAuth()) }}>Log out</button>
            : <button className='btn btn-primary' onClick={() => { navigate("./login") }}>Login</button>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;