import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { getUser, loadUsers, getUserProfile } from "./userSlice";
import { UsersList } from "./UsersList";
export function Search() {
  const dispatch = useDispatch();
  const {
    users,
    usersStatus,
    profile,
    fetchUserProfileStatus,
    authSetupStatus,
  } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState(
    users?.map((user) =>
      profile?.following.includes(user._id)
        ? { ...user, followingStatus: true }
        : { ...user, followingStatus: false }
    )
  );
  useEffect(() => {
    if (usersStatus === "idle" && authSetupStatus === "success") {
      dispatch(loadUsers());
      dispatch(getUserProfile());
    }
  }, [usersStatus, dispatch, status, authSetupStatus]);
  useEffect(() => {
    if (
      fetchUserProfileStatus === "idle" &&
      profile &&
      authSetupStatus === "success"
    ) {
      dispatch(getUser({ getUserId: profile._id }));
    }
  }, [dispatch, fetchUserProfileStatus, profile, status, authSetupStatus]);
  function textAreaHandler(e) {
    const filteredUsers = users.filter((user) =>
      user.username.includes(e.target.value)
    );

    setMatchedUsers(filteredUsers);
  }

  return users === null || matchedUsers === null ? (
    <SpinnerLoader />
  ) : (
    <div className="text-white min-h-screen border border-opacity-2 mb-14 xsm:mb-0">
      <section className="bg-blue  p-2 border-b border-opacity-20  flex">
        <button
          onClick={() => navigate(-1)}
          className="self-center text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2"
        >
          <BiArrowBack size={18} />
        </button>
        <p className="p-2 text-xl">Search</p>
      </section>
      <div className="w-screen md:w-[60vw] lg:w-[50vw] flex flex-col justify-center p-2 md:p-8">
        <input
          type="text"
          placeholder="Search people"
          className="rounded-lg mt-8 bg-grey-outline bg-opacity-10 border border-blue-light h-12 "
          onChange={textAreaHandler}
        />
        {matchedUsers.length !== 0 && profile !== null && (
          <UsersList users={matchedUsers} />
        )}
      </div>
    </div>
  );
}
