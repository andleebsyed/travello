import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { getUser } from "./userSlice";
import { UsersList } from "./UsersList";

export function Followers() {
  const { getUserId, followersOrFollowing } = useParams();
  console.log(
    "i am in followers component ",
    { getUserId },
    { followersOrFollowing }
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchedUserProfile, fetchUserProfileStatus } = useSelector(
    (state) => state.users
  );
  const [showFollowers, setShowFollowers] = useState(
    followersOrFollowing === "followers" ? true : false
  );
  console.log({ fetchedUserProfile });
  useEffect(() => {
    console.log("useeffect of followers running");
    //   this handles async call to api via thunk
    if (fetchedUserProfile) {
      if (getUserId !== fetchedUserProfile._id) {
        dispatch(getUser({ getUserId }));
      }
    } else if (fetchUserProfileStatus === "idle") {
      dispatch(getUser({ getUserId }));
    }
  }, [dispatch, fetchUserProfileStatus, fetchedUserProfile, getUserId]);
  let renderList;
  if (fetchedUserProfile) {
    if (showFollowers) {
      renderList = fetchedUserProfile.followers;
    } else {
      renderList = fetchedUserProfile.following;
    }
  }

  return (
    <div>
      {fetchedUserProfile ? (
        <div className="border  border-opacity-20 mr-0 w-screen  md:w-[60vw] lg:w-[50vw] min-h-screen text-white">
          <section className="bg-blue  p-2  flex">
            <button
              onClick={() => navigate(-1)}
              className="self-center text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2"
            >
              <BiArrowBack size={18} />
            </button>
            <section className="flex flex-col p-2 pb-0">
              <p className=" text-xl font-bold">{fetchedUserProfile.name}</p>
              <p className="text-sm">@{fetchedUserProfile.username}</p>
            </section>
          </section>
          <section className="flex justify-between">
            <div
              onClick={() => setShowFollowers(true)}
              className="followToggle"
            >
              <div className="flex flex-col  items-center justify-end">
                <p className="p-2">Followers</p>
                <div
                  className={`${
                    showFollowers ? "visible" : "invisible"
                  } bg-blue-light h-1 w-[5rem] text-blue-light rounded`}
                ></div>
              </div>
            </div>
            <div
              onClick={() => setShowFollowers(false)}
              className="followToggle"
            >
              <div className="flex flex-col  items-center justify-end">
                <p className="p-2">Following</p>
                <div
                  className={`${
                    !showFollowers ? "visible" : "invisible"
                  } bg-blue-light h-1 w-[5rem] text-blue-light rounded`}
                ></div>
              </div>
            </div>
          </section>

          <UsersList users={renderList} />
        </div>
      ) : (
        <SpinnerLoader />
      )}
    </div>
  );
}
