import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { ShowPost } from "../posts/showPost";
import {
  followNewUser,
  getUser,
  getUserProfile,
  unFollowUser,
} from "./userSlice";
import nodata from "../../assets/images/nodata.svg";
export function UserPage() {
  const { fetchUserProfileStatus, fetchedUserProfile, profile, profileStatus } =
    useSelector((state) => state.users);
  const { status, users } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInFollowing, setUserInFollowing] = useState(null);
  const { getUserId } = useParams();
  console.log({ getUserId });
  useEffect(() => {
    if (profile !== null) {
      console.log(profile.following, "profile following");
      setUserInFollowing(
        profile.following.find((following) => following === getUserId)
      );
    }
  }, [getUserId, profile]);
  useEffect(() => {
    if (
      (profileStatus === "idle" || fetchUserProfileStatus === "idle") &&
      status !== "idle" &&
      users === null
    ) {
      dispatch(getUserProfile());
    }
  }, [
    dispatch,
    status,
    fetchUserProfileStatus,
    getUserId,
    profileStatus,
    users,
  ]);
  useEffect(() => {
    if (fetchedUserProfile && status !== "idle") {
      if (getUserId !== fetchedUserProfile._id) {
        dispatch(getUser({ getUserId }));
      }
    } else if (fetchUserProfileStatus === "idle") {
      dispatch(getUser({ getUserId }));
    }
  }, [dispatch, fetchUserProfileStatus, fetchedUserProfile, getUserId, status]);
  return fetchedUserProfile === null || fetchedUserProfile === undefined ? (
    <SpinnerLoader />
  ) : (
    <div className="border  border-opacity-20 mr-0 w-screen  md:w-[60vw] lg:w-[50vw] min-h-screen text-white">
      <section className="bg-blue  p-2  flex">
        <button
          onClick={() => navigate(-1)}
          className="self-center text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2"
        >
          <BiArrowBack size={18} />
        </button>
        <p className="p-2 text-xl font-bold">{fetchedUserProfile.name}</p>
      </section>
      <section className="">
        <img
          alt="cover"
          src={fetchedUserProfile.coverPic}
          className="h-40 w-full "
        />
        <img
          alt="user avatar"
          src={fetchedUserProfile?.avatar}
          className="rounded-full w-20 h-20 ml-2 relative bottom-10 "
        />
        <div className="flex flex-col relative bottom-16 ml-2 ">
          <div className="ml-auto">
            {userInFollowing ? (
              <button
                className="bg-blue-light rounded-3xl pl-2 pr-2 mr-2 pb-1"
                onClick={() =>
                  dispatch(
                    unFollowUser({ userToUnfollowId: fetchedUserProfile._id })
                  )
                }
              >
                Following
              </button>
            ) : (
              <button
                className="border  border-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-3xl pl-2 pr-2 pb-1 mr-2"
                onClick={() =>
                  dispatch(followNewUser({ newUserId: fetchedUserProfile }))
                }
              >
                Follow
              </button>
            )}
          </div>
          <p className="font-bold">{fetchedUserProfile.name}</p>
          <p className="font-light mb-2">@{fetchedUserProfile.username}</p>
          <p>
            {fetchedUserProfile.bio
              ? fetchedUserProfile.bio
              : "Hey i am a travello User"}
          </p>
          <div className="flex">
            <Link to={`/user/${fetchedUserProfile._id}/followers`}>
              <p className="mr-2 hover:underline">
                {fetchedUserProfile.followers.length} Followers
              </p>
            </Link>
            <Link to={`/user/${fetchedUserProfile._id}/following`}>
              <p className="hover:underline">
                {fetchedUserProfile.following.length} Following
              </p>
            </Link>
          </div>
        </div>
        <div className="flex  ">
          <p className="font-bold m-2 border-b-4 border-blue-light mb-0 text-blue-light">
            Posts
          </p>
        </div>
      </section>
      <section className="border-t ">
        {fetchedUserProfile?.posts?.length === 0 ||
        fetchedUserProfile === null ? (
          <div className="flex flex-col justify-center items-center min-h-[50vh] ">
            {/* <p className="text-xl">No Posts To Show</p> */}
            <img src={nodata} alt="data empty" className="h-[50%] w-[50%]" />
            <p className="text-xl ">Feed is Empty</p>
          </div>
        ) : (
          fetchedUserProfile.posts.map((post) => (
            <ShowPost post={post} user={fetchedUserProfile} />
          ))
        )}
      </section>
    </div>
  );
}
