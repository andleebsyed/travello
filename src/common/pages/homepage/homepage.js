import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../../../features/posts/createPost";
import { ShowPost } from "../../../features/posts/showPost";
import { getUserProfile } from "../../../features/users/userSlice";
import { SpinnerLoader } from "../../components/Loaders/Spinner";
import nodata from "../../../assets/images/nodata.svg";
import { loadPosts } from "../../../features/posts/postSlice";
export function Homepage() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const { profileStatus, profile, authSetupStatus } = useSelector(
    (state) => state.users
  );
  console.log({ status }, { profileStatus });
  // useEffect(() => {
  //   if (
  //     profileStatus === "idle" &&
  //     authSetupStatus === "success" &&
  //     status !== "idle"
  //   ) {
  //     console.log("we are fetching the user");
  //     dispatch(getUserProfile());
  //   }
  // }, [status, profileStatus, dispatch, authSetupStatus]);
  useEffect(() => {
    if (authSetupStatus === "success" && profileStatus === "idle") {
      console.log("load user on home firing");

      dispatch(getUserProfile());
    }
  });
  useEffect(() => {
    if (
      authSetupStatus === "success" &&
      //  profileStatus === "idle" &&
      status === "idle"
    ) {
      console.log("load posts on home firing");
      dispatch(loadPosts());
    }
  });
  return (
    <div
      className="flex border border-b-0 border-opacity-20 text-white min-h-screen"
      id="home"
    >
      <section className="w-screen   md:w-[60vw] lg:w-[50vw]  gridbreak:mr-0">
        <div className="hidden xsm:block sticky top-0 bg-blue h-14 ">
          <a
            href="#home"
            className="text-white  text-xl  m-4 font-semibold outline-none "
          >
            Home
          </a>
        </div>

        <CreatePost />
        {(status === "idle" && posts === null) ||
        posts.length === 0 ||
        profile === null ||
        status === "idle" ? (
          <SpinnerLoader />
        ) : posts.length > 0 ? (
          <ul className="  ">
            {posts.map((post) => (
              <li key={post._id}>
                <ShowPost post={post} user={profile} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[50vh] ">
            <img src={nodata} alt="data empty" className="h-[50%] w-[50%]" />
            <p className="text-xl ">Empty</p>
          </div>
        )}
      </section>
    </div>
  );
}
