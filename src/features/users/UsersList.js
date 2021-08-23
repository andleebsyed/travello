import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { followNewUser, unFollowUser } from "./userSlice";
import nodata from "../../assets/images/nodata.svg";
export function UsersList({ users, searchResultsVisibility }) {
  const dispatch = useDispatch();
  //  const [searchResultsVisibility, setSearchResultsVisibility] =
  //    useState("hidden");
  function followUserHandler(newUserId) {
    console.log("step 1:: came in handler");
    dispatch(followNewUser({ newUserId }));
  }
  function unfollowUserHandler(userToUnfollowId) {
    console.log("step 1:: hit unfollow user handler");
    dispatch(unFollowUser({ userToUnfollowId }));
  }
  console.log("userList is accessed ", users);
  return (
    <div
      className={`${
        searchResultsVisibility ? searchResultsVisibility : "visible"
      } `}
    >
      {users.length < 1 ? (
        <div className="mt-12 flex justify-center">
          <img src={nodata} alt="data empty" className="h-[50%] w-[50%]" />
        </div>
      ) : (
        <ul className="p-2  xsm:p-4 border border-blue-light m-2  md:m-4 rounded">
          {users?.map((user) => (
            <li className="flex flex-col">
              <section className="flex">
                <Link to={`/user/${user._id}`}>
                  <img
                    alt="user avatar"
                    src={user?.avatar}
                    className="rounded-full w-12 h-12 cursor-pointer"
                  />
                </Link>

                <section className="flex flex-col ml-2">
                  <h1 className="font-bold hover:underline cursor-pointer">
                    {user?.name}
                  </h1>
                  <h1>{user?.username}</h1>
                </section>
                {user.followingStatus ? (
                  <button
                    onClick={() => unfollowUserHandler(user._id)}
                    className="self-center ml-auto rounded-3xl p-2  pb-3 border border-opacity-20 bg-blue-light text-white "
                  >
                    Following
                  </button>
                ) : (
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
// const UsersList = ({ users }) => (
//   <div
//     className={`${searchResultsVisibility} p-2  xsm:p-4 border border-blue-light m-2  md:m-4 rounded`}
//   >
//     <ul>
//       {users?.map((user) => (
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
