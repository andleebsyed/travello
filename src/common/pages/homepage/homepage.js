import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../../../features/posts/createPost";
import { loadPosts } from "../../../features/posts/postSlice";
import { ShowPost } from "../../../features/posts/showPost";
// import { FetchAllPosts } from "../../../services/posts/posts";
import { setUpAuthHeaderForServiceCalls } from "../../../services/users/users";
import { Navbar } from "../navbar/navbar";

export function Homepage() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  console.log({ posts });
  useEffect(() => {
    async function Run() {
      console.log("useeffct to get posts ran");
      setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
      dispatch(loadPosts());
      //   const response = await FetchAllPosts();
      //   console.log({ response });
    }
    if (status === "idle") {
      Run();
    }
  }, [status, dispatch]);
  return (
    <div className="flex p-4 xsm:p-0  text-white  ">
      <Navbar />
      <section className="w-full md:w-[70vw]">
        <CreatePost />
        {posts.length < 0 ? (
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
