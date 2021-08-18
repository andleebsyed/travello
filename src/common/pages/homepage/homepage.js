import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CreatePost } from "../../../features/posts/createPost";
import { loadPosts } from "../../../features/posts/postSlice";
import { ShowPost } from "../../../features/posts/showPost";
import { setUpAuthHeaderForServiceCalls } from "../../../services/users/users";
import { SpinnerLoader } from "../../components/Loaders/Spinner";

export function Homepage() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const { authorized } = useSelector((state) => state.users);
  const navigate = useNavigate();
  console.log("posts ", { posts });
  useEffect(() => {
    async function Run() {
      setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
      dispatch(loadPosts());
    }
    if (status === "idle" && authorized) {
      Run();
    }
  }, [status, dispatch, authorized]);
  useEffect(() => {
    if (authorized === false) {
      navigate("/login", { replace: true });
    }
  }, [authorized, navigate]);

  return (
    <div
      className="flex border border-b-0 border-opacity-20 text-white min-h-screen"
      id="home"
    >
      <section className="w-screen   md:w-[60vw] lg:w-[50vw] xsm:mr-4 gridbreak:mr-0">
        <div className="hidden xsm:block sticky top-0 bg-blue h-14 ">
          <a
            href="#home"
            className="text-white  text-xl  m-4 font-semibold outline-none "
          >
            Home
          </a>
        </div>

        <CreatePost />
        {(status === "loading" && posts === null) || posts === null ? (
          <SpinnerLoader />
        ) : posts.length > 0 ? (
          <ul className="  ">
            {posts.map((post) => (
              <li key={post._id}>
                <ShowPost post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center min-h-[50vh] ">
            <p className="text-xl">No Posts To Show</p>
          </div>
        )}
      </section>
    </div>
  );
}
