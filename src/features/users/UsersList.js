import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followNewUser, unFollowUser } from "./userSlice";
import nodata from "../../assets/images/nodata.svg";
export function UsersList({ users, searchResultsVisibility }) {
  const { profile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  function followUserHandler(newUserId) {
    dispatch(followNewUser({ newUserId }));
  }
  function unfollowUserHandler(userToUnfollowId) {
    dispatch(unFollowUser({ userToUnfollowId }));
  }
  return (
    <div
      className={` ${
        searchResultsVisibility ? searchResultsVisibility : "visible"
      } `}
    >
      {users.length < 1 ? (
        <div className="mt-12 flex justify-center">
          <img src={nodata} alt="data empty" className="h-[50%] w-[50%]" />
        </div>
      ) : (
        <ul className="p-2  xsm:p-4 border border-blue-light m-1  md:m-4 rounded">
          {users?.map((user) => (
            <li className="flex flex-col mt-4 mb-4" key={user._id}>
              <section className="flex">
                <Link
                  to={
                    profile?._id === user._id ? "/profile" : `/user/${user._id}`
                  }
                >
                  <img
                    alt="user avatar"
                    src={user?.avatar}
                    className="rounded-full w-12 h-12 cursor-pointer hover:opacity-80"
                  />
                </Link>

                <section className="flex flex-col ml-2">
                  <Link
                    to={
                      profile?._id === user._id
                        ? "/profile"
                        : `/user/${user._id}`
                    }
                  >
                    <h1 className="font-bold hover:underline cursor-pointer">
                      {user?.name}
                    </h1>
                  </Link>

                  <h1>{user?.username}</h1>
                </section>
                {profile?.following.includes(user._id)
                  ? profile?._id !== user._id && (
                      <button
                        onClick={() => unfollowUserHandler(user._id)}
                        className="self-center ml-auto rounded-3xl p-2  pb-3 border border-opacity-20 bg-blue-light text-white "
                      >
                        Following
                      </button>
                    )
                  : profile._id !== user._id && (
                      <button
                        onClick={() => followUserHandler(user._id)}
                        className=" ml-auto rounded-3xl p-2  pb-3 border border-blue-light border-opacity-20 hover:bg-blue-light hover:bg-opacity-20 text-white "
                      >
                        Follow
                      </button>
                    )}
              </section>
              <p className="font-bold   ml-2">{user.bio}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
