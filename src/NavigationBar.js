import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import  useUser  from './hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';

const NavigationBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <nav>
      <ul>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/articles"}>Articles</NavLink></li>
        <li><NavLink to={"/about"}>About</NavLink></li>
      </ul>
      <div className='nav-right'>
        {user?.email}
        {user
          ? <button onClick={() => { signOut(getAuth()) }}>Log out</button>
          : <button onClick={() => { navigate("./login") }}>Login</button>
        }

      </div>
    </nav>
  )
}

export default NavigationBar;