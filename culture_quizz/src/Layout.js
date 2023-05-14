import '../../style/Layout.css'
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';


const Layout = () => {
  
  let cookies = Cookies.get()
  if (cookies.Pseudo == undefined) {
    cookies.Pseudo = "Not Connected"
  }


  const handleRemoveCookie = () => {
    Cookies.remove("Pseudo");
    window.location.href = "http://localhost:3001/"

  };


  return (
    <>
      <nav>
        <ul>
          <div id='left'>
            <li>
              <a>
                <Link to="/">Home</Link>
              </a>
            </li>
          <li>
            <a>
              <Link to="/question">Question</Link>
            </a>
          </li>
          </div>
          <div id="pseudo">
            <p>
              {cookies.Pseudo}
            </p>
          </div>
          <div id='right'>
            <li>
              <a>
              {cookies.Pseudo !== "Not Connected" ? (
                  <button onClick={handleRemoveCookie}>Se deconnecter</button>
              ):("")}
              </a>
              </li>
            <li>
              <a>
                <Link to="/login">Login</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/signin">Signin</Link>
              </a>
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;