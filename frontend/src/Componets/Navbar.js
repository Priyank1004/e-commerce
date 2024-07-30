import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  console.log(auth)
  const logout = () => {
    console.log("Logout");
    localStorage.removeItem('user');
    navigate('./signup')
  }

  return (
    <div className='nav-ul'>
        <div className='nav-logo'>
          <img src='https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900' alt="logo" width="128px" />
        </div>
      <div>
        {
          auth ? <ul className="nav-right">
            <li><Link to="/">Products</Link> </li>
            <li><Link to="/add">Add Products</Link> </li>
            <li><Link to="/update">Update Products</Link> </li>
            <li><Link to="/profile">Profile</Link> </li>
            <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
            :
            <ul className="nav-ul nav-right">
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
        }
      </div>
    </div>
  )
}

export default Navbar
