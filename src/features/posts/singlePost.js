import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUpAuthHeaderForServiceCalls } from "../../services/users/users";
import { loadPosts } from "./postSlice";
import { ShowPost } from "./showPost";
import { BiArrowBack } from "react-icons/bi";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { getUserProfile } from "../users/userSlice";
import { GetPost } from "../../services/posts/posts";
import { responsiveFontSizes } from "@material-ui/core";
export function SinglePost({ post, user }) {
  const { posts, status } = useSelector((state) => state.posts);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(null);
  // useEffect(() => {
  //   if (posts === null || posts.length === 0) {
  //     setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
  //     dispatch(loadPosts());
  //     dispatch(getUserProfile());
  //   }
  // }, [dispatch, posts]);
  const navigate = useNavigate();
  // console.log({ post });
  // useEffect(() => {});
  // return (
  // post === undefined ? (
  //   <SpinnerLoader />
  // ) : (
  useEffect(() => {
    async function Run() {
      if (status !== "idle") {
        console.log("useeffect ran");
        const response = await GetPost({ postId });
        console.log({ response });
        const postDetails = { user: response.post.author, post: response.post };
        setPostData(postDetails);
        // setPostData(postData => {...postData, user: resposne.autho})}
      }
    }
    Run();
  }, [postId, status]);
  return (
    <div className="w-screen min-h-screen md:w-[60vw] border border-opacity-10 xsm:mr-4 text-white">
      <section className="bg-blue  p-2 border-b border-opacity-20  flex">
        <button
          onClick={() => navigate(-1)}
          className="self-center text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2"
        >
          <BiArrowBack size={18} />
        </button>
        <p className="p-2 text-xl">Post</p>
      </section>
      {postData === null ? (
        <SpinnerLoader />
      ) : (
        <ShowPost post={postData.post} user={postData.user} />
      )}
    </div>
  );
}
