import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUpAuthHeaderForServiceCalls } from "../../services/users/users";
import { loadPosts } from "./postSlice";
import { ShowPost } from "./showPost";

export function SinglePost() {
  const { posts } = useSelector((state) => state.posts);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { name, username } = useSelector((state) => state.posts);
  useEffect(() => {
    if (posts === null) {
      setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
      dispatch(loadPosts());
    }
  }, [dispatch, posts]);
  console.log({ postId });
  const post = posts?.find((post) => post._id === postId);
  console.log(post);
  return post === undefined ? (
    <div>loading </div>
  ) : (
    <div className="w-[95vw] md:w-[70vw] xsm:mr-4 text-white">
      <ShowPost post={post} />
    </div>
  );
}
