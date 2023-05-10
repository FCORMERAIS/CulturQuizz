import '../../style/Layout.css'
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
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
          </div>
          <div id='right'>
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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quizz">Quizz</Link>
          </li>
          <li>
            <Link to="/question">Question</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;