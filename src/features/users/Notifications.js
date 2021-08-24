import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";

export function Notifications() {
  const { profile } = useSelector((state) => state.users);
  const navigate = useNavigate();
  if (profile) {
    console.log(profile.notifications);
  }
  return !profile ? (
    <SpinnerLoader />
  ) : (
    profile.notifications && (
      <div className="border  border-opacity-20 mr-0 w-screen  md:w-[60vw] lg:w-[50vw] min-h-screen text-white">
        <section className="bg-blue  p-2  flex">
          <button
            onClick={() => navigate(-1)}
            className="self-center text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2"
          >
            <BiArrowBack size={18} />
          </button>
          <p className="p-2 text-xl font-bold">Notifications</p>
        </section>
        <ul className="m-4">
          {profile?.notifications.map((notification) => (
            <li className="border border-opacity-20 flex  m-2 p-2">
              <Link to={`/user/${notification._id}`}>
                <img
                  alt="user avatar"
                  src={notification?.avatar}
                  className="rounded-full w-12 h-12 cursor-pointer mr-4"
                />
              </Link>
              <p className="flex justify-center items-center">
                <Link to={`/user/${notification._id}`}>
                  <span className="hover:underline font-bold mr-2">
                    {notification.name}
                  </span>
                </Link>
                followed you
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
