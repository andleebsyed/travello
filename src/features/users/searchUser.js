import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { followNewUser, loadUsers, unFollowUser } from "./userSlice";
import { UsersList } from "./UsersList";
export function Search() {
  console.log("i am here ");
  const dispatch = useDispatch();
  const { users, usersStatus, profile } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.posts);
  if (users) {
    console.log("last step to see wether our thing is working or not ", {
      users,
    });
  }
  console.log("in serach component ", { users });
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [finalUsers, setFinalUsers] = useState(null);
  useEffect(() => {
    if (usersStatus === "idle" && status !== "idle") {
      dispatch(loadUsers());
    }
  }, [usersStatus, dispatch, status]);
  useEffect(() => {
    // if (
    //   (profileStatus === "idle" || profile === null) &&
    //   status !== "idle" &&
    //   users !== null
    // ) {
    //   // dispatch(getUserProfile());
    // }
    if (profile && users) {
      const followersCheckUsers = users.map((user) =>
        profile.following.includes(user._id)
          ? { ...user, followingStatus: true }
          : { ...user, followingStatus: false }
      );
      setFinalUsers(followersCheckUsers);
    }
  }, [profile, users]);
  // console.log("");
  const [searchResultsVisibility, setSearchResultsVisibility] =
    useState("hidden");
  const [searchData, setSearchData] = useState(null);
  let filteredUsers;
  function textAreaHandler(e) {
    console.log(profile.followers, profile.following);
    setSearchData(e.target.value);
    console.log({ users }, "users in serrchc box context");
    filteredUsers = finalUsers.filter((user) =>
      user.username.includes(e.target.value)
    );
    console.log("filtered users ", filteredUsers.length, matchedUsers.length);

    setMatchedUsers(filteredUsers);
  }
  useEffect(() => {
    if (searchData && searchData.length > 0) {
      setSearchResultsVisibility("block");
    } else if (
      !searchData ||
      searchData.length < 1 ||
      matchedUsers.length < 1
    ) {
      setSearchResultsVisibility("hidden");
    }
  }, [searchData, matchedUsers.length]);
  // function followUserHandler(newUserId) {
  //   console.log("step 1:: came in handler");
  //   dispatch(followNewUser({ newUserId }));
  // }
  // function unfollowUserHandler(userToUnfollowId) {
  //   console.log("step 1:: hit unfollow user handler");
  //   dispatch(unFollowUser({ userToUnfollowId }));
  // }
  // function unfollowUserHandler() {
  //   dispatch(unFollowUser())
  // }
  // const UsersList = ({ users }) => (
  //   <div
  //     className={`${searchResultsVisibility} p-2  xsm:p-4 border border-blue-light m-2  md:m-4 rounded`}
  //   >
  //     <ul>
  //       {matchedUsers?.map((user) => (
  //         <li className="flex flex-col">
  //           <section className="flex">
  //             <Link to={`/user/${user._id}`}>
  //               <img
  //                 alt="user avatar"
  //                 src={user?.avatar}
  //                 className="rounded-full w-12 h-12 cursor-pointer"
  //               />
  //             </Link>

  //             <section className="flex flex-col ml-2">
  //               <h1 className="font-bold hover:underline cursor-pointer">
  //                 {user?.name}
  //               </h1>
  //               <h1>{user?.username}</h1>
  //             </section>
  //             {user.followingStatus ? (
  //               <button
  //                 onClick={() => unfollowUserHandler(user._id)}
  //                 className="self-center ml-auto rounded-3xl p-2  pb-3 border border-opacity-20 bg-blue-light text-white "
  //               >
  //                 Following
  //               </button>
  //             ) : (
  //               <button
  //                 onClick={() => followUserHandler(user._id)}
  //                 className=" ml-auto rounded-3xl p-2  pb-3 border border-blue-light border-opacity-20 hover:bg-blue-light hover:bg-opacity-20 text-white "
  //               >
  //                 Follow
  //               </button>
  //             )}
  //           </section>
  //           <p className="font-bold   ml-2">{user.bio}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
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
        <UsersList
          users={matchedUsers}
          searchResultsVisibility={searchResultsVisibility}
        />
      </div>
    </div>
  );
}
