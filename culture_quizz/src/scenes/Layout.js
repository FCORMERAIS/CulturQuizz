import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/question">Question</Link>
          </li>
        </ol>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;