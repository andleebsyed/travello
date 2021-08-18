import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { removeToken } from "../../../features/users/userSlice";
import { useDispatch } from "react-redux";
import { refreshUserPosts } from "../../../features/posts/postSlice";
export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function logoutHandler() {
    localStorage.clear();
    dispatch(removeToken());
    dispatch(refreshUserPosts());
    navigate("/login");
  }
  return (
    <main className=" fixed  xsm:sticky xsm:self-start w-screen bottom-0 xsm:top-0  xsm:pr-8 gridbreak:pr-0 xsm:w-auto bg-blue text-white  ">
      <ul className="flex  pr-4  justify-around xsm:flex-col xsm:justify-between items-end xsm:items-center gridbreak:items-start ">
        <li className="navbar-list-item  ">
          <NavLink
            to="/home"
            activeClassName="active-class"
            className="navlink-inactive-class"
            end
          >
            <AiOutlineHome size={30} className="self-center " />
            <span className="navbar-list-item-name  ">Home</span>
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/explore"
            activeClassName="active-class"
            className="navlink-inactive-class"
            end
          >
            <RiSearchLine size={30} className="self-center" />
            <span className="navbar-list-item-name ">Search</span>
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/notifications"
            activeClassName="active-class"
            className="navlink-inactive-class"
            end
          >
            <IoIosNotificationsOutline size={30} className="self-center" />
            <span className="navbar-list-item-name ">Notifications</span>
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/profile"
            activeClassName="active-class"
            className="navlink-inactive-class"
            end
          >
            <IoPersonOutline size={30} className="self-center" />
            <span className="navbar-list-item-name ">Profile</span>
          </NavLink>
        </li>
        <li className="self-center gridbreak:mt-12">
          <button
            onClick={logoutHandler}
            className=" flex text-lg hover:bg-blue-xlight p-4 rounded-full hover:text-blue-light"
          >
            <p className="hidden gridbreak:block self-center mr-2">Logout</p>
            <div className="self-center">
              <BiLogOut size={30} />
            </div>
          </button>
        </li>
      </ul>
    </main>
  );
}
