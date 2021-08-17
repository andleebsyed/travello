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
    <div className="flex  text-white" id="home">
      <section className="w-screen  md:w-[70vw] xsm:mr-4 gridbreak:mr-0">
        <div className="hidden xsm:block sticky top-0 bg-blue h-14  border-b border-l border-r border-opacity-50 ">
          <a
            href="#home"
            className="text-white  text-xl  m-4 font-semibold outline-none "
          >
            Home
          </a>
        </div>

        <CreatePost />
        {status === "loading" || posts === null ? (
          <h1 className="text-white">Loading...</h1>
        ) : (
          <ul className="   ">
            {posts.map((post) => (
              <li key={post._id}>
                <ShowPost post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
