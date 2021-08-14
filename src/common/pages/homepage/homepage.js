import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CreatePost } from "../../../features/posts/createPost";
import { loadPosts } from "../../../features/posts/postSlice";
import { ShowPost } from "../../../features/posts/showPost";
import { setUpAuthHeaderForServiceCalls } from "../../../services/users/users";

export function Homepage() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const { authorized } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    async function Run() {
      console.log("useeffct to get posts ran");
      setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
      dispatch(loadPosts());
    }
    if (status === "idle") {
      console.log("posts being collected");
      Run();
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (authorized === false) {
      navigate("/login", { replace: true });
    }
  }, [authorized, navigate]);

  return (
    <div className="flex p-4 xsm:p-0  text-white" id="home">
      <section className="w-[95vw] md:w-[70vw] xsm:mr-4 gridbreak:mr-0">
        <div className="hidden xsm:block sticky top-0 bg-blue h-14  border-b border-l border-r border-opacity-50 ">
          <a
            href="#home"
            className="text-white  text-xl  m-4 font-semibold outline-none "
          >
            Home
          </a>
        </div>

        <CreatePost />
        {status === "loading" ? (
          <h1 className="text-white">Loading...</h1>
        ) : (
          <div className="   ">
            {posts.map((post) => (
              <ShowPost post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
