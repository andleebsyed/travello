import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ShowPost } from "./showPost";
import { BiArrowBack } from "react-icons/bi";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { GetPost } from "../../services/posts/posts";
import { fetchSinglePost } from "./postSlice";
export function SinglePost({ post, user }) {
  const { status, singlePostStatus, postData } = useSelector(
    (state) => state.posts
  );
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log({ postData });
  useEffect(() => {
    async function Run() {
      console.log("useeffect ran");
      const response = await GetPost({ postId });
      console.log({ response });
      if (response.status) {
        dispatch(fetchSinglePost({ postId }));
      }
    }
    if (
      status !== "idle" &&
      (singlePostStatus === "idle" || postData?.post?._id !== postId)
    ) {
      Run();
    }
  }, [postId, status, singlePostStatus, dispatch, postData]);
  console.log("singlepost status ");
  return (
    <div className="w-screen min-h-screen md:w-[60vw] lg:w-[50vw]  border border-opacity-10 xsm:mr-4 text-white">
      <section className="bg-blue  p-2 border-b border-opacity-20  flex">
        <button
          onClick={() => navigate(-1)}
          className="self-center text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2"
        >
          <BiArrowBack size={18} />
        </button>
        <p className="p-2 text-xl">Post</p>
      </section>
      {postData === null || postData.post._id !== postId ? (
        <SpinnerLoader />
      ) : (
        <ShowPost post={postData.post} user={postData.user} />
      )}
    </div>
  );
}
