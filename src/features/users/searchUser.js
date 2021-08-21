import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { loadUsers } from "./userSlice";
export function Search() {
  const dispatch = useDispatch();
  const { users, usersStatus } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.posts);
  console.log("in serach component ", { users });
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    if (usersStatus === "idle" && status !== "idle") {
      dispatch(loadUsers());
    }
  }, [usersStatus, dispatch, status]);
  const [searchResultsVisibility, setSearchResultsVisibility] =
    useState("hidden");
  const [searchData, setSearchData] = useState(null);
  function textAreaHandler(e) {
    setSearchData(e.target.value);
    console.log({ users }, "users in serrchc box context");
    setMatchedUsers(
      users.filter((user) => user.username.includes(e.target.value))
    );
    console.log(matchedUsers.length, users.length);
  }
  useEffect(() => {
    if (searchData && searchData.length > 0) {
      setSearchResultsVisibility("block");
    } else if (!searchData || searchData.length < 1) {
      setSearchResultsVisibility("hidden");
    }
  }, [searchData]);
  const SearchResults = () => (
    <div
      className={`${searchResultsVisibility} p-4 border border-blue-light m-4 rounded`}
    >
      <ul>
        {matchedUsers.map((user) => (
          <li className="flex">
            <Link to={`/user/${user._id}`}>
              <img
                alt="user avatar"
                src={user?.avatar}
                className="rounded-full w-12 h-12 ml-2 cursor-pointer"
              />
            </Link>

            <section className="flex flex-col ml-2">
              <h1 className="font-bold hover:underline cursor-pointer">
                {user?.name}
              </h1>
              <h1>{user?.username}</h1>
            </section>
            <button className="self-center ml-auto rounded-3xl pl-4 pr-4 border border-opacity-20 bg-blue-light text-white ">
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  return users === null ? (
    <SpinnerLoader />
  ) : (
    <div className="text-white min-h-screen border border-opacity-2">
      <div className="w-screen md:w-[60vw] lg:w-[50vw] flex flex-col justify-center p-8">
        <input
          type="text"
          placeholder="Search people"
          className="rounded-lg mt-8 bg-grey-outline bg-opacity-10 border border-blue-light h-12 "
          onChange={textAreaHandler}
        />
        <SearchResults />
      </div>
    </div>
  );
}
