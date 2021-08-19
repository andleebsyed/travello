import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { setUpAuthHeaderForServiceCalls } from "../../services/users/users";
import { loadPosts } from "../posts/postSlice";
import { ShowPost } from "../posts/showPost";
import { getUserProfile } from "./userSlice";

export function Profile() {
  const { profileStatus, profile } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ profile }, { profileStatus });
  useEffect(() => {
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
    console.log("mai chalai jaaraha hu");

    if (profileStatus === "idle" || profile === null) {
      dispatch(loadPosts());
      dispatch(getUserProfile());
    }
  }, [posts?.length]);
  return profileStatus !== "success" ||
    profile === null ||
    profile.avatar === undefined ||
    null ? (
    <SpinnerLoader />
  ) : (
    <div className="border  border-opacity-20 w-screen   md:w-[60vw] lg:w-[50vw] min-h-screen text-white">
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
        <img alt="cover" src={profile.coverPic} className="h-40 w-full" />
        <img
          alt="user avatar"
          src={profile?.avatar}
          className="rounded-full w-20 h-20 ml-2 relative bottom-10 "
        />
        <div className="flex flex-col relative bottom-16 ml-2 ">
          <button className="ml-auto mr-4 self-end border hover:bg-grey-outline hover:bg-opacity-20 rounded-3xl h-8 pl-2 pr-2 mt-2">
            Edit profile
          </button>
          <p className="font-bold">{profile.name}</p>
          <p className="font-light mb-2">@{profile.username}</p>
          <p>kuch b aayaiga yaha</p>
          <div className="flex">
            <p className="mr-2">999 Followers</p>
            <p>999 Following</p>
          </div>
        </div>
      </section>
      <section className="border-t ">
        {profile?.posts?.length <= 0 && posts?.length <= 0 ? (
          <div className="flex justify-center items-center min-h-[50vh] font-bold text-lg">
            <p>Oops!!Your feed is empty</p>
          </div>
        ) : posts?.length > 0 ? (
          posts.map((post) => <ShowPost post={post} />)
        ) : (
          profile.posts.map((post) => <ShowPost post={post} />)
        )}
      </section>
    </div>
  );
}
