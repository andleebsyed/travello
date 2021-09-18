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
  useEffect(() => {
    if (
      authSetupStatus === "success" &&
      (profileStatus === "idle" || profileStatus === "error")
    ) {
      dispatch(getUserProfile());
    }
  });
  useEffect(() => {
    if (
      authSetupStatus === "success" &&
      (status === "idle" || status === "error")
    ) {
      dispatch(loadPosts());
    }
  });
  let orderedPosts = null;
  orderedPosts = posts
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
        {status === "idle" || profile === null || !orderedPosts ? (
          <SpinnerLoader />
        ) : orderedPosts.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[50vh] ">
            <img src={nodata} alt="data empty" className="h-[50%] w-[50%]" />
            <p className="text-xl ">Empty</p>
          </div>
        ) : (
          <ul className=" mb-14 xsm:mb-0 ">
            {orderedPosts.map((post) => (
              <li key={post._id}>
                <ShowPost post={post} user={profile} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
