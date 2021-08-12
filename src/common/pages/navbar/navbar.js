import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <main className="fixed mt-12 xsm:sticky xsm:self-start w-screen bottom-0 xsm:top-0  xsm:pr-8 gridbreak:pr-0 xsm:w-auto bg-blue text-white  ">
      <ul className="flex pr-4  justify-around xsm:flex-col xsm:justify-between items-end xsm:items-center gridbreak:items-start ">
        <li className="navbar-list-item  ">
          <NavLink
            to="/home"
            activeClassName="active-class"
            className="xsm:flex xsm:p-4 gridbreak:p-0 gridbreak:pl-4"
            end
          >
            <i className="ri-home-7-line text-3xl  self-center "></i>
            <span className="navbar-list-item-name  ">Home</span>
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/explore"
            activeClassName="active-class"
            className="xsm:flex xsm:p-4 gridbreak:p-0 gridbreak:pl-4"
            end
          >
            <i className="ri-hashtag text-3xl self-center fill"></i>

            <span className="navbar-list-item-name ">Explore</span>
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/notifications"
            activeClassName="active-class"
            className="xsm:flex xsm:p-4 gridbreak:p-0 gridbreak:pl-4"
            end
          >
            <i className="ri-notification-3-line text-3xl self-center"></i>
            <span className="navbar-list-item-name ">Notifications</span>
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/profile"
            activeClassName="active-class"
            className="xsm:flex xsm:p-4 gridbreak:p-0 gridbreak:pl-4"
            end
          >
            <i className="ri-user-3-line text-3xl self-center"></i>
            <span className="navbar-list-item-name ">Profile</span>
          </NavLink>
        </li>
      </ul>
    </main>
  );
}
