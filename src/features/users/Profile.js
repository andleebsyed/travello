import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { ShowPost } from "../posts/showPost";
import { EditProfileModal } from "./editProfile";
import { getUserProfile } from "./userSlice";

export function Profile() {
  const { profileStatus, profile } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log({ profile }, { profileStatus });
  useEffect(() => {
    console.log("internakl runs first or not");
    if (profileStatus === "idle" && status !== "idle") {
      console.log("let's fetch profile");
      dispatch(getUserProfile());
    }
  }, [posts?.length, status, dispatch, profileStatus]);

  return profile === null ? (
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
        <p className="p-2 text-xl font-bold">{profile.name}</p>
      </section>
      <section className="">
        <img alt="cover" src={profile.coverPic} className="h-40 w-full " />
        <img
          alt="user avatar"
          src={profile?.avatar}
          className="rounded-full w-20 h-20 ml-2 relative bottom-10 "
        />
        <div className="flex flex-col relative bottom-16 ml-2 ">
          <EditProfileModal />
          <p className="font-bold">{profile.name}</p>
          <p className="font-light mb-2">@{profile.username}</p>
          <p>{profile.bio ? profile.bio : "Hey i am a travello User"}</p>
          <div className="flex">
            <Link to={`/user/${profile._id}/followers`}>
              <p className="mr-2 hover:underline">
                {profile.followers.length} Followers
              </p>
            </Link>
            <Link to={`/user/${profile._id}/following`}>
              <p className="hover:underline">
                {profile.following.length} Following
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
        {profile?.posts?.length <= 0 && posts?.length <= 0 ? (
          <div className="flex justify-center items-center min-h-[50vh] font-bold text-lg">
            <p>Oops!!Your feed is empty</p>
          </div>
        ) : posts?.length > 0 ? (
          posts.map((post) => <ShowPost post={post} user={profile} />)
        ) : (
          profile.posts.map((post) => <ShowPost post={post} user={profile} />)
        )}
      </section>
    </div>
  );
}
