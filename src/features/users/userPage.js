import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { ShowPost } from "../posts/showPost";
import { getUser, getUserProfile } from "./userSlice";
export function UserPage() {
  const { fetchUserProfileStatus, fetchedUserProfile, profile, profileStatus } =
    useSelector((state) => state.users);
  const { status } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInFollowers, setUserInFollowers] = useState(null);
  const { getUserId } = useParams();
  console.log({ getUserId });
  useEffect(() => {
    if (
      (profileStatus === "idle" || fetchUserProfileStatus === "idle") &&
      status !== "idle"
    ) {
      dispatch(getUserProfile());
      //   dispatch(getUser({ getUserId }));
      //   dispatch(getUser({ getUserId }));
    }
  }, [dispatch, status, fetchUserProfileStatus, getUserId, profileStatus]);
  useEffect(() => {
    // let isMounted = true;

    // if (
    //   getUserId !== fetchedUserProfile?._id ||
    //   fetchUserProfileStatus === "idle"
    // ) {
    //   dispatch(getUser({ getUserId }));
    //   }
    if (fetchedUserProfile) {
      if (getUserId !== fetchedUserProfile._id) {
        dispatch(getUser({ getUserId }));
      }
    } else if (fetchUserProfileStatus === "idle") {
      dispatch(getUser({ getUserId }));
    }
    // return () => (isMounted = false);
  }, [getUserId, dispatch, fetchedUserProfile, fetchUserProfileStatus]);
  if (fetchedUserProfile && profile !== null) {
    const userInFollowersCheck = profile.followers.find(
      (follower) => follower._id === fetchedUserProfile._id
    );
    if (userInFollowersCheck) {
      setUserInFollowers(true);
    }
    // else {
    //   setUserInFollowers(false);
    // }
  }
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
          <div className="ml-auto mr-4 self-end border hover:bg-grey-outline hover:bg-opacity-20 rounded-3xl h-8 pl-2 pr-2 mt-2">
            {/* <EditfetchedUserProfileModal /> */}
            {userInFollowers ? (
              <button>Following</button>
            ) : (
              <button>Follow</button>
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
            <p className="mr-2">999 Followers</p>
            <p>999 Following</p>
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
          <div className="flex justify-center items-center min-h-[50vh] font-bold text-lg">
            <p>Oops!!Your feed is empty</p>
          </div>
        ) : (
          // ) : fetchedUserProfile?.length > 0 ? (
          fetchedUserProfile.posts.map(
            (post) => <ShowPost post={post} user={fetchedUserProfile} />
            // ) : (
            //   fetchedUserProfile.fetchedUserProfile.posts.map((post) => (
            //     <ShowPost post={post} user={fetchedUserProfile} />
            //   ))
          )
        )}
      </section>
      {/* <EdituserProfileModal /> */}
    </div>
  );
}
